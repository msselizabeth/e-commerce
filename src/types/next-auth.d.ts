import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    tel: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    tel: string;
  }
}
