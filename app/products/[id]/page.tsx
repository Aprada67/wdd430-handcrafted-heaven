// app/products/[id]/page.tsx
import ProductClient from "./productclient";
import { getProductById, getProducts } from "@/app/lib/products";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) notFound();

  // Server-side DB calls
  const product = await getProductById(productId);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  return <ProductClient product={product} related={related} />;
}
