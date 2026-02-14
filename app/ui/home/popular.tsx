import { getProducts } from "@/app/lib/products";
import Link from "next/link";

export default async function Popular() {
  const products = await getProducts();

  const popular = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-8 text-[#8c3f23]">
        Most Popular
      </h2>

      {/* SAME GRID AS PRODUCTS PAGE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {popular.map((product) => (
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
              <Link
                href={`/products/${product.id}`}
                className="text-center text-xs px-4 py-2 rounded-full
                           bg-[#7a3e1d] text-white hover:opacity-90 transition"
              >
                View more information
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
