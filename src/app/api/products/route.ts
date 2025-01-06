import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma.ts"

export async function GET() {
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          productName: true,
          image: true,
          price: true,
        },
      });
  
      return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
  }
  