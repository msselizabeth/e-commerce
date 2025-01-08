"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  productName: string;
  price: number;
  image: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products?page=${page}`);
      const data = await res.json();
      const fetchedProducts: Product[] = data.products;
      const totalProducts: number = data.pagination.totalProducts;

      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      setTotalProducts(totalProducts);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (!products.length && !loading) return <div>Loading...</div>;

  return (
    <section className="section font-serif">
      <div className="container mx-auto">
        <h2 className="section-title">Products</h2>
        <p className="mt-1 text-slate-400 text-center">
          Order it for you or for your beloved ones
        </p>

        <ul className="flex flex-col items-center justify-center gap-6 mt-5 md:flex-row md:flex-wrap md:gap-8 lg:justify-start lg:gap-6  ">
          {products.map((product: Product, index: number) => {
            return (
              <li
                key={index}
                className="w-full h-48 bg-slate-50 rounded-lg shadow hover:shadow-green-400 hover:scale-105 overflow-hidden relative md:w-[47.5%] md:h-full lg:w-[23%] transition-all duration-300">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.productName}
                    width={550}
                    height={550}
                    className="w-80 h-56 mx-auto lg:w-52 lg:h-40"
                  />
                  <div className="p-2 bg-white rounded-lg absolute bottom-0 w-full lg:static ">
                    <h3 className="font-base font-medium">
                      {product.productName}
                    </h3>
                    <p className="mt-1 text-green-600 text-right font-semibold">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {products.length < totalProducts && (
          <div className="flex justify-center mt-5">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-300"
              onClick={handleLoadMore}
              disabled={loading}>
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
