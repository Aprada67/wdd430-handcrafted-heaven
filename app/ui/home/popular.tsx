import { getProducts } from "@/app/lib/products";
import Link from "next/link";

export default async function Popular() {
  const products = await getProducts();

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Most Popular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-text mb-2">${product.price}</p>
            <Link
              href={`/products/${product.id}`}
              className="inline-block cursor-pointer transition-all duration-200
              hover:[color:var(--interactive-color)] hover:scale-105"
            >
              BUY NOW!
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}