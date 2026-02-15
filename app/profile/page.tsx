import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { FaEdit, FaBoxOpen, FaStar } from "react-icons/fa";
import AddProductButton from "@/app/ui/add-product-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // TODO: si estos stats vienen de DB, cámbialos por query real.
  const stats = {
    products: 12,
    sales: 47,
    rating: 4.8,
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 border border-[#D98B61]/40 flex items-center justify-center text-4xl font-bold text-[#8C3F23]">
            {session.user?.name?.[0] || "U"}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {session.user?.name}
            </h1>
            <p className="text-gray-500">{session.user?.email}</p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-[#8C3F23] hover:bg-[#A6592D] text-white py-2 px-4 rounded-md shadow-md transition active:scale-95">
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow text-center border border-[#D98B61]/25">
          <h2 className="text-xl font-bold text-gray-800">{stats.products}</h2>
          <p className="text-gray-600 flex items-center justify-center gap-1">
            <span className="text-[#A6592D]">
              <FaBoxOpen />
            </span>
            Products
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow text-center border border-[#D98B61]/25">
          <h2 className="text-xl font-bold text-gray-800">{stats.sales}</h2>
          <p className="text-gray-600 flex items-center justify-center gap-1">
            <span className="text-[#A6592D]">
              <FaBoxOpen />
            </span>
            Sales
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow text-center border border-[#D98B61]/25">
          <h2 className="text-xl font-bold text-gray-800">{stats.rating}</h2>
          <p className="text-gray-600 flex items-center justify-center gap-1">
            <span className="text-[#A6592D]">
              <FaStar />
            </span>
            Rating
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <AddProductButton />
        </div>

        <button className="flex-1 bg-transparent border-2 border-[#8C3F23] text-[#8C3F23] hover:bg-[#8C3F23] hover:text-white py-3 rounded-md shadow-md transition active:scale-95">
          View My Products
        </button>
      </div>
    </div>
  );
}