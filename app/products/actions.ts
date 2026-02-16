import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) throw new Error("Falta POSTGRES_URL (o POSTGRES_URL_NON_POOLING).");
const sql = neon(DB_URL);

export async function addProductWithUpload(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("No authenticated user (missing email).");
  }
  const ownerEmail = session.user.email;

  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price"));
  const description = String(formData.get("description") || "").trim();
  const category_id = Number(formData.get("category_id"));
  const file = formData.get("imageFile") as File | null;

  if (!name || !description || !Number.isFinite(price) || !file) {
    throw new Error("Invalid form data.");
  }

  if (!Number.isFinite(category_id) || ![1, 2, 3, 4].includes(category_id)) {
    throw new Error("Invalid category selected.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("The uploaded file must be an image.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() || "png";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  const imagePath = `/uploads/${fileName}`;

  await sql`
    INSERT INTO products (name, price, image_url, description, category_id, owner_email)
    VALUES (${name}, ${price}, ${imagePath}, ${description}, ${category_id}, ${ownerEmail});
  `;

  revalidatePath("/products");
  revalidatePath("/profile");
  redirect("/products?mine=1");
}

export async function deleteProduct(id: number) {
  "use server";

  await sql`DELETE FROM products WHERE id = ${id};`;

  revalidatePath("/products");
  revalidatePath("/profile");
}