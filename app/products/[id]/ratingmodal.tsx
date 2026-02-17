"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  productId: number;
  onClose: () => void;
  onSubmit: (rating: { stars: number; comment: string }) => void;
  blurBackground?: boolean;
};

export default function RatingModal({ productId, onClose, onSubmit, blurBackground }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a star rating and a comment.");
      return; // do not close modal
    }
    onSubmit({ stars: rating, comment });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        blurBackground ? "backdrop-blur-sm bg-black/30" : "bg-black bg-opacity-50"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Rate this product</h2>

        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={30}
              className="cursor-pointer"
              color={star <= (hover || rating) ? "#FBBF24" : "#D1D5DB"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <textarea
          placeholder="Leave a comment (required)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#7a3e1d] text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}
