"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) {
  throw new Error(
    "Couldn't find POSTGRES_URL (or POSTGRES_URL_NON_POOLING) in .env/.env.local"
  );
}

const sql = neon(DB_URL);

export async function addProduct(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const priceRaw = String(formData.get("price") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const description = String(formData.get("description") || "").trim();

  const price = Number(priceRaw);

  if (!name || !image || !description || !Number.isFinite(price)) {
    throw new Error("Invalid data. Review name/price/image/description.");
  }

  await sql`
    INSERT INTO products (name, price, image_url, description, category_id)
    VALUES (${name}, ${price}, ${image}, ${description}, 1);
  `;

  revalidatePath("/products");
  revalidatePath("/profile");

  redirect("/products");
}