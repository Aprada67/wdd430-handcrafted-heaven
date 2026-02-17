import { NextRequest, NextResponse } from "next/server";
import { addToCart } from "@/app/cart/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { productId } = await req.json();
  await addToCart(session.user.email, Number(productId));

  return NextResponse.json({ success: true });
}
