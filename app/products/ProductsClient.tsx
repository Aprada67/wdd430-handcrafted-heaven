"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
};

type Props = {
  products?: Product[];
};

export default function ProductsClient({ products = [] }: Props) {
  const [filter, setFilter] = useState("all");

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    const text = search.toLowerCase();

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text)
    );
  }, [products, search]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredProducts.map((p) => p.category)));
  }, [filteredProducts]);

  function handleAddToCart(product: Product) {
    alert(`Added ${product.name} to cart`);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full border text-sm transition ${
            filter === "all"
              ? "bg-[#7a3e1d] text-white border-[#7a3e1d]"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              filter === cat
                ? "bg-[#7a3e1d] text-white border-[#7a3e1d]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {categories.map((cat) => {
        const items =
          filter === "all"
            ? filteredProducts.filter((p) => p.category === cat)
            : filter === cat
            ? filteredProducts.filter((p) => p.category === cat)
            : [];

        if (items.length === 0) return null;

        return (
          <section key={cat} className="mb-14">
            <h2 className="text-xl font-semibold mb-6 capitalize text-[#8c3f23]">
              {cat}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#d9b391] rounded-2xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-[180px] object-cover hover:scale-105 transition"
                      />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-gray-800">
                      {product.name}
                    </h3>
                  </Link>

                  <span className="text-sm font-semibold mt-1">
                    ${product.price}
                  </span>

                  <div className="mt-auto pt-3 flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-xs px-4 py-2 rounded-full border border-[#7a3e1d] text-[#7a3e1d] hover:bg-[#7a3e1d] hover:text-white transition"
                    >
                      Add to cart
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      className="text-center text-xs px-4 py-2 rounded-full bg-[#7a3e1d] text-white hover:opacity-90 transition"
                    >
                      View more information
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </main>
  );
}
