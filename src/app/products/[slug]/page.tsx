import DetailedProduct from "@/components/DetailedProduct/DetailedProduct";

interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  wax: string;
  fragrance: string;
  dimension: string;
  weight: string;
}


async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
    cache: "force-cache",
  });
  const result = await res.json();
  const prod: Product = result.product;
  if (!prod) {
    console.error("Error");
  }
  return prod;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getProduct(slug);

    return (
      <DetailedProduct product={item}/>
  );
}
