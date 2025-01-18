"use client"
import Image from "next/image";
import { ReactElement, useState } from "react";

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
interface DetailedProductProps {
    product: Product;
  }

const DetailedProduct = ({ product }: DetailedProductProps): ReactElement => {
    const [quantity, setQuantity] = useState<number>(1);

    const addQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1)
        }
        return;
    }
    const removeQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
        return;
    }
    return (
        <section className="section font-serif md:w-2/3 mx-auto lg:flex lg:w-full lg:gap-8 lg:items-center">
            <div className="lg:w-3/5">
            <h1 className="section-title text-left">{product.productName}</h1>
            <div className="w-full bg-slate-50 mt-5">
            <Image src={product.image} alt={product.productName} width={1500} height={1250} className="w-full"/>
            </div>
           </div>
            <div>
            <div className="p-3 flex items-center justify-between ">
                <p className="text-emerald-500 font-semibold text-xl">$ {product.price}</p>

                <div className="flex items-center gap-2 p-1 border border-green-400">
                    <button onClick={addQuantity} className="flex items-center justify-center w-5 h-5 text-green-400 aria-disabled:text-gray-500" aria-disabled={quantity >= product.stock}>+</button>
                    <span>{quantity}</span>
                    <button onClick={removeQuantity} className="flex items-center justify-center w-5 h-5 text-green-400 aria-disabled:text-gray-500" aria-disabled={quantity <= 1}>-</button>
                </div>
            </div>
            <div className="w-full">
            <button
              className="w-full px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition-all duration-300">
              Add to cart
            </button>
            </div>
            
            <div className=" flex flex-col gap-2 border p-4 mt-5 rounded-lg text-gray-400">
                <p><span className="mr-1 text-section-titles">Wax:</span> {product.wax}</p>
                <p><span className="mr-1 text-section-titles">Fragrance:</span> {product.fragrance}</p>
                {/* <p>Burning time: {product.}</p> */}
                <p><span className="mr-1 text-section-titles">Dimension:</span> {product.dimension}</p>
                <p><span className="mr-1 text-section-titles">Weight:</span> {product.weight}g</p>
            </div>
         </div>
       </section>
   )
}

export default DetailedProduct;