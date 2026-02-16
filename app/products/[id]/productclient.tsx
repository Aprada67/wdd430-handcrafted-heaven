"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AddToCartButton from "./addtocartbutton";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const RatingModal = dynamic(() => import("./ratingmodal"), { ssr: false });

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
};

type Rating = {
  stars: number;
  comment: string;
};

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductClient({ product, related }: Props) {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Load ratings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ratings");
    if (stored) {
      const allRatings = JSON.parse(stored);
      if (allRatings[product.id]) {
        setRatings(
          Array.isArray(allRatings[product.id])
            ? allRatings[product.id]
            : [allRatings[product.id]]
        );
      }
    }
  }, [product.id]);

  const handleNewRating = (newRating: Rating) => {
    if (newRating.stars === 0 || newRating.comment.trim() === "") {
      alert("Please provide a star rating and a comment.");
      return;
    }

    const updated = [newRating, ...ratings];
    setRatings(updated);

    const stored = localStorage.getItem("ratings");
    const allRatings = stored ? JSON.parse(stored) : {};
    allRatings[product.id] = updated;
    localStorage.setItem("ratings", JSON.stringify(allRatings));

    setIsRatingOpen(false);
  };

  const handleDeleteRating = (index: number) => {
    const updated = ratings.filter((_, i) => i !== index);
    setRatings(updated);

    const stored = localStorage.getItem("ratings");
    const allRatings = stored ? JSON.parse(stored) : {};
    allRatings[product.id] = updated;
    localStorage.setItem("ratings", JSON.stringify(allRatings));
  };

  // Show 6 ratings (2 rows × 3 columns) by default
  const initialVisibleCount = 6;
  const displayedRatings = showAll ? ratings : ratings.slice(0, initialVisibleCount);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* ===== MAIN PRODUCT ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* LEFT COLUMN: IMAGE + RATINGS */}
        <div className="flex flex-col items-center">
          <Image
            src={product.image_url.startsWith("/") ? product.image_url : "/" + product.image_url}
            alt={product.name}
            width={420}
            height={320}
            className="rounded-lg object-cover"
          />

          {/* ===== RATINGS GRID ===== */}
          <div className="w-full mt-6 border-t border-gray-300 pt-4">
            <h2 className="text-xl font-semibold mb-4">Ratings</h2>

            {ratings.length === 0 && (
              <p className="text-gray-500">No ratings yet. Be the first to rate!</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
              {displayedRatings.map((r, idx) => (
                <div
                  key={idx}
                  className="sm:col-span-2 p-4 bg-gray-50 rounded-lg border flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`mr-1 text-lg ${
                            i < r.stars ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteRating(idx)}
                    className="text-red-500 hover:text-red-700 mt-2 self-end"
                    title="Delete rating"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Show More / Show Less */}
            {ratings.length > initialVisibleCount && !showAll && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-blue-600 hover:underline"
                >
                  Show {ratings.length - initialVisibleCount} more rating
                  {ratings.length - initialVisibleCount > 1 ? "s" : ""}
                </button>
              </div>
            )}
            {showAll && ratings.length > initialVisibleCount && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(false)}
                  className="text-blue-600 hover:underline"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: INFO */}
        <div className="flex flex-col justify-start min-h-[420px]">
          <h1 className="text-3xl font-semibold text-[#7a3e1d] mb-3">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <span className="text-lg font-semibold mb-6">${product.price}</span>

          <div className="flex gap-4">
            <AddToCartButton product={product} />
            <button
              onClick={() => setIsRatingOpen(true)}
              className="px-6 py-2 rounded-full bg-[#7a3e1d] text-white hover:opacity-90 transition"
            >
              Rating
            </button>
          </div>
        </div>
      </section>

      {/* ===== SEE MORE PRODUCTS ===== */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6">See More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="bg-[#c99a6a] rounded-2xl p-4 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-full flex justify-center mb-3">
                  <Image
                    src={item.image_url.startsWith("/") ? item.image_url : "/" + item.image_url}
                    alt={item.name}
                    width={180}
                    height={140}
                    className="rounded-md object-cover h-[130px] w-[180px]"
                  />
                </div>
                <h3 className="text-sm font-medium text-[#3b1f0f] leading-snug">{item.name}</h3>
                <span className="text-sm font-semibold mt-1 text-[#3b1f0f]">${item.price}</span>
                <span className="mt-4 inline-block text-xs px-5 py-1.5 rounded-full bg-[#7a3e1d] text-white">
                  View more information
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== RATING MODAL ===== */}
      {isRatingOpen && (
        <RatingModal
          productId={product.id}
          onClose={() => setIsRatingOpen(false)}
          onSubmit={(r) => handleNewRating(r)}
          blurBackground={true}
        />
      )}
    </main>
  );
}
