"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "mugs" | "vase" | "plate" | "bowl";
};

const products: Product[] = [
  {
    id: "1",
    name: "Ceramic Mug",
    price: 25,
    image: "/images/hero-pottery.jpg",
    category: "mugs",
  },
  {
    id: "2",
    name: "Modern Vase",
    price: 45,
    image: "/images/hero-pottery.jpg",
    category: "vase",
  },
  {
    id: "3",
    name: "Clay Plate",
    price: 30,
    image: "/images/hero-pottery.jpg",
    category: "plate",
  },
  {
    id: "4",
    name: "Handmade Bowl",
    price: 28,
    image: "/images/hero-pottery.jpg",
    category: "bowl",
  },
];

export default function Products() {
  const [filter, setFilter] = useState<"all" | Product["category"]>("all");

  return (
    <main className="shop">
      <div className="filterBar">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>

        <button
          onClick={() => setFilter("mugs")}
          className={filter === "mugs" ? "active" : ""}
        >
          Mugs
        </button>

        <button
          onClick={() => setFilter("vase")}
          className={filter === "vase" ? "active" : ""}
        >
          Vase
        </button>

        <button
          onClick={() => setFilter("plate")}
          className={filter === "plate" ? "active" : ""}
        >
          Clay plate
        </button>

        <button
          onClick={() => setFilter("bowl")}
          className={filter === "bowl" ? "active" : ""}
        >
          Bowl
        </button>
      </div>

      {(["mugs", "vase", "plate", "bowl"] as const).map((cat) => {
        const items =
          filter === "all"
            ? products.filter((p) => p.category === cat)
            : filter === cat
            ? products.filter((p) => p.category === cat)
            : [];

        if (items.length === 0) return null;

        return (
          <section key={cat}>
            <h2 className="categoryTitle">
              {cat === "mugs"
                ? "Mugs"
                : cat === "vase"
                ? "Vase"
                : cat === "plate"
                ? "Clay plate"
                : "Bowl"}
            </h2>

            <div className="grid">
              {items.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="card"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                  />

                  <h3>{product.name}</h3>
                  <span>${product.price}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
