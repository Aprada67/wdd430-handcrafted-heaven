import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) throw new Error("Missing POSTGRES_URL.");
const sql = neon(DB_URL);

export async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const ownerEmail = session.user.email;

  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price"));
  const description = String(formData.get("description") || "").trim();
  const category_id = Number(formData.get("category_id"));
  const image_url = String(formData.get("image_url") || "").trim();

  if (!name || !description || !image_url || !Number.isFinite(price)) {
    throw new Error("Invalid form data.");
  }

  if (!Number.isFinite(category_id) || ![1, 2, 3, 4].includes(category_id)) {
    throw new Error("Invalid category selected.");
  }

  await sql`
    INSERT INTO products (name, price, image_url, description, category_id, owner_email)
    VALUES (${name}, ${price}, ${image_url}, ${description}, ${category_id}, ${ownerEmail});
  `;

  revalidatePath("/products");
  revalidatePath("/profile");

  redirect("/products?mine=1");
}