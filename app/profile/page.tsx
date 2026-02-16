import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import AddProductButton from "@/app/ui/add-product-button";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DB_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
if (!DB_URL) throw new Error("Missing POSTGRES_URL");

const sql = neon(DB_URL);

type UserRow = {
  display_name: string;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const email = session.user?.email;
  if (!email) redirect("/login");

  const result = await sql`
    SELECT display_name
    FROM users
    WHERE email = ${email}
    LIMIT 1;
  `;

  const rows = result as UserRow[];
  const displayName = rows[0]?.display_name || session.user?.name || "User";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 border border-[#D98B61]/40 flex items-center justify-center text-4xl font-bold text-[#8C3F23]">
            {displayName?.[0] || "U"}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <Link
          href="/profile/edit"
          className="flex items-center gap-2 bg-[#8C3F23] hover:bg-[#A6592D] text-white py-2 px-4 rounded-md shadow-md transition active:scale-95"
        >
          <FaEdit /> Edit Profile
        </Link>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>

        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Display name:</span>{" "}
            {displayName}
          </p>
          <p>
            <span className="font-medium text-gray-800">Email:</span> {email}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <AddProductButton />
        </div>

        <Link
          href="/products?mine=1"
          className="flex-1 text-center bg-transparent border-2 border-[#8C3F23] text-[#8C3F23] hover:bg-[#8C3F23] hover:text-white py-3 rounded-md shadow-md transition active:scale-95"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}