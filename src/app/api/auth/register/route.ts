import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // console.log(body);
    const { firstName, lastName, tel, address, postalCode, email, password } =
      body;
    const errors: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email is invalid.");
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push(
        "The password must be at least 8 characters long, contain at least one letter and one special character($,!,^,etc), and no spaces."
      );
    }

    const nameRegex = /^[A-Za-z]{2,}$/;
    if (!nameRegex.test(firstName)) {
      errors.push(
        "The first name must contain at least 2 letters without spaces."
      );
    }
    if (!nameRegex.test(lastName)) {
      errors.push(
        "The last name must contain at least 2 letters without spaces."
      );
    }

    const postalCodeRegex = /^[A-Za-z0-9]{6}$/;
    if (!postalCodeRegex.test(postalCode)) {
      errors.push("The postal code must be exactly 6 characters long and contain only letters and numbers.");
    }

    const phoneRegex =
      /^(\+?\d{1,2})?\s?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    if (!phoneRegex.test(tel)) {
      errors.push("The phone number is invalid.");
    }

    if (!address || address.trim().length === 0) {
      errors.push("Address cannot be empty.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        tel,
        address,
        postalCode,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        tel: true,
        address: true,
        postalCode: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "A user with this email or number already exists.",
          },
          { status: 400 }
        );
      }
    }
  
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
