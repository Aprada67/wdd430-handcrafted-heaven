import { NextRequest, NextResponse } from "next/server";
import { updateQuantity } from "@/app/cart/actions";

export async function POST(req: NextRequest) {
  const { itemId, quantity } = await req.json();
  await updateQuantity(Number(itemId), Number(quantity));
  return NextResponse.json({ success: true });
}
