import { sql } from './db';

export async function getProducts() {
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
  `;

  return products;
}