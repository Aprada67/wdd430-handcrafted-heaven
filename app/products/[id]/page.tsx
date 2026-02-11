import Image from "next/image";
import Link from "next/link";
import { getProductById, getProducts } from "@/app/lib/products";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  const allProducts = await getProducts();

  const related = allProducts
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 8);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* ===== MAIN PRODUCT ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* image */}
        <div className="flex justify-center">
          <Image
            src={
              product.image_url.startsWith("/")
                ? product.image_url
                : "/" + product.image_url
            }
            alt={product.name}
            width={420}
            height={320}
            className="rounded-lg object-cover"
          />
        </div>

        {/* info */}
        <div className="flex flex-col justify-center">

          <h1 className="text-3xl font-semibold text-[#7a3e1d] mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <span className="text-lg font-semibold mb-6">
            ${product.price}
          </span>

          <div className="flex gap-4">

            <button
              className="px-6 py-2 rounded-full border border-[#7a3e1d]
                         text-[#7a3e1d] hover:bg-[#7a3e1d]
                         hover:text-white transition"
            >
              Add cart
            </button>

            <button
              className="px-6 py-2 rounded-full bg-[#7a3e1d]
                         text-white hover:opacity-90 transition"
            >
              Buy
            </button>

          </div>
        </div>
      </section>

      {/* ===== SEE MORE ===== */}
{related.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold mb-6">
      See More
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {related.map((item) => (
        <Link
          key={item.id}
          href={`/products/${item.id}`}
          className="
            bg-[#c99a6a]
            rounded-2xl
            p-4
            flex
            flex-col
            items-center
            text-center
            transition
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="w-full flex justify-center mb-3">
            <Image
              src={
                item.image_url.startsWith("/")
                  ? item.image_url
                  : "/" + item.image_url
              }
              alt={item.name}
              width={180}
              height={140}
              className="rounded-md object-cover h-[130px] w-[180px]"
            />
          </div>

          <h3 className="text-sm font-medium text-[#3b1f0f] leading-snug">
            {item.name}
          </h3>

          <span className="text-sm font-semibold mt-1 text-[#3b1f0f]">
            ${item.price}
          </span>

          <span
            className="
              mt-4
              inline-block
              text-xs
              px-5
              py-1.5
              rounded-full
              bg-[#7a3e1d]
              text-white
            "
          >
            View more information
          </span>
        </Link>
      ))}
    </div>
  </section>
)}
    </main>
  );
}
