"use client";

import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function AddProductButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/products/new")}
      className="w-full flex items-center justify-center gap-2 bg-[#8C3F23] hover:bg-[#A6592D] text-white py-3 px-6 rounded-md shadow-md transition active:scale-95"
    >
      <FaPlus />
      Add New Product
    </button>
  );
}