import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma.ts";
import { Product } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required." },
      { status: 400 }
    );
  }

  try {
    const product: Product | null = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: `Product with ID: ${params.id} doesn't exsist.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
