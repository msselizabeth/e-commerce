import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

type MinimalProduct = {
  id: string;
  productName: string;
  image: string | null;
  price: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4");
  const skip = (page - 1) * limit;

  try {
    const products: MinimalProduct[] = await prisma.product.findMany({
      where: {
        productName: {
          contains: query,
        },
      },
      select: {
        id: true,
        productName: true,
        image: true,
        price: true,
      },
      skip,
      take: limit,
    });

    if (products.length === 0) {
      return NextResponse.json({ error: "No products found." }, { status: 404 });
    }

    const totalProducts = await prisma.product.count({
      where: {
        productName: {
          contains: query,
        },
      },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json(
      {
        products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
