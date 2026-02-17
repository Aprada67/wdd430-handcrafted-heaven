import { NextRequest, NextResponse } from "next/server";
import { removeFromCart } from "@/app/cart/actions";

export async function POST(req: NextRequest) {
  const { itemId } = await req.json();
  await removeFromCart(Number(itemId));
  return NextResponse.json({ success: true });
}
