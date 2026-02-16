import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) throw new Error("Missing POSTGRES_URL");
const sql = neon(DB_URL);

export async function updateProfile(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const email = session.user.email;
  const displayName = String(formData.get("display_name") || "").trim();

  if (!displayName) {
    throw new Error("Display name is required.");
  }

  await sql`
    INSERT INTO users (email, display_name)
    VALUES (${email}, ${displayName})
    ON CONFLICT (email) DO UPDATE
    SET display_name = EXCLUDED.display_name;
  `;

  revalidatePath("/profile");
  redirect("/profile");
}