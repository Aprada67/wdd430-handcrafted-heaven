import { neon } from "@neondatabase/serverless";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) throw new Error("Missing POSTGRES_URL");
const sql = neon(DB_URL);

export async function addToCart(email: string, productId: number) {
  // Create cart if not exists
  const cart = (await sql`
    INSERT INTO carts (user_email)
    VALUES (${email})
    ON CONFLICT (user_email) DO NOTHING
    RETURNING id
  `) as { id: number }[];

  const cartId =
    cart[0]?.id ??
    ((await sql`
      SELECT id FROM carts WHERE user_email = ${email} LIMIT 1
    `) as { id: number }[])[0].id;

  // Add or increment product
  await sql`
    INSERT INTO cart_items (cart_id, product_id, quantity)
    VALUES (${cartId}, ${productId}, 1)
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + 1
  `;
}

export async function removeFromCart(itemId: number) {
  await sql`DELETE FROM cart_items WHERE id = ${itemId}`;
}

export async function updateQuantity(itemId: number, quantity: number) {
  if (quantity < 1) throw new Error("Quantity must be at least 1");
  await sql`UPDATE cart_items SET quantity = ${quantity} WHERE id = ${itemId}`;
}
