import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-4 rounded-md border p-4">
        <p><b>Name:</b> {session.user?.name}</p>
        <p><b>Email:</b> {session.user?.email}</p>
      </div>
    </div>
  );
}