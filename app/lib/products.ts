import { sql } from "./db";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
};

export async function getProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT
      products.id,
      products.name,
      products.price,
      products.image_url,
      products.description,
      categories.name AS category
    FROM products
    JOIN categories
      ON products.category_id = categories.id
    ORDER BY products.id
  `;

  return products as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const productId = Number(id);
  if (Number.isNaN(productId)) return null;

  const result = await sql`
    SELECT
      products.id,
      products.name,
      products.price,
      products.image_url,
      products.description,
      categories.name AS category
    FROM products
    JOIN categories
      ON products.category_id = categories.id
    WHERE products.id = ${productId}
    LIMIT 1
  `;

  return (result as Product[])[0] ?? null;
}