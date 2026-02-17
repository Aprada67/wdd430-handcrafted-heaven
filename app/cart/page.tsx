"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  // Increase quantity
  const handleIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (remove if 0)
  const handleDecrease = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 mt-4 md:mt-12">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden border bg-gray-50">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-medium text-gray-900">{item.name}</h2>
                  </div>

                  {/* Quantity + remove */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FaTrash size={16} /> Delete
                    </button>
                  </div>
                </div>

                <div className="flex items-center md:justify-end mt-2 md:mt-0">
                  <span className="font-semibold text-gray-900 text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-gray-900 text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* ✅ Proceed to Checkout */}
            <Link
              href="/test"
              className="w-full block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-md text-center transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
