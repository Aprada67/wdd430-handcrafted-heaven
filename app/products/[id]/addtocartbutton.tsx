"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    try {
      const cartJson = localStorage.getItem("cart");
      const cart: { id: number; name: string; price: number; image_url: string; quantity: number }[] = cartJson
        ? JSON.parse(cartJson)
        : [];

      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
      alert(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-6 py-2 rounded-full border border-[#7a3e1d]
                 text-[#7a3e1d] hover:bg-[#7a3e1d]
                 hover:text-white transition"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
