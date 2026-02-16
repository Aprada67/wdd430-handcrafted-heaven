import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { updateProfile } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>

      <form action={updateProfile} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display name
          </label>
          <input
            name="display_name"
            defaultValue={session.user?.name ?? ""}
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#D98B61]/50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8C3F23] hover:bg-[#A6592D] text-white py-3 rounded-md shadow-md transition active:scale-95"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}