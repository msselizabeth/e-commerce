"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  productName: string;
  price: number;
  image: string;
}

const Products =  () => {
    const [products, setProducts] = useState<Product[]>([]);
 
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products')
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts()
  }, [])
 
  console.log(products)
  if (!products) return <div>Loading...</div>

  return (
    <section className="section font-serif">
      <div className="container mx-auto">
        <h2 className="section-title">Products</h2>
        <p className="mt-1 text-slate-400 text-center">Order it for you or for your beloved ones</p>

        <ul className="flex flex-col items-center justify-center gap-6 mt-5">
            {products.map((product: Product, index: number) => {
                return (
                    <li key={index} className="w-full h-48 items-center bg-slate-50 rounded-lg shadow overflow-hidden relative">
                      <Link href={`/products/${product.id}`}>
                      <Image src={product.image} alt={product.productName} width={550} height={550} className="w-80 h-56 mx-auto " />
                    <div className="p-2 bg-white rounded-lg absolute bottom-0 w-full">
                    <h3 className="font-base font-medium">{product.productName}</h3>
                    <p className="mt-1 text-green-600 text-right font-semibold">${product.price}</p>
                    </div>
                      </Link>
                    </li>
                )
            }) }
        </ul>
      </div>
    </section>
  );
};

export default Products;
