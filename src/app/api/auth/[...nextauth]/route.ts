import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });


        if (!user) {
          throw new Error("No user found with the given email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          postalCode: user.postalCode,
          tel: user.tel,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      console.log("User in JWT callback:", user); // Для отладки
  console.log("Token in JWT callback:", token);
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.address = user.address;
        token.postalCode = user.postalCode;
        token.tel = user.tel;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.address = token.address as string;
        session.user.postalCode = token.postalCode as string;
        session.user.tel = token.tel as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
