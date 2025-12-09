import React from "react";
import Image from "next/image";

type RecipeCard = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
  img?: string;
  cuisine: string;
};

export default function RecipeCard({
  meal,
  estimatedCost,
  img,
  cuisine,
}: RecipeCard) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm ">
      <div className="relative w-full h-48 mb-3">
        <Image
          src={img ?? "/fallback/default.jpg"}
          alt={meal}
          fill
          className="object-cover rounded-xl"
        />

        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur">
          {cuisine}
        </span>
      </div>
      <h3 className="text-ml font-semibold pt-3">{meal}</h3>
      <p className="text-sm text-gray-500">
        {" "}
        Estimated Cost : ${estimatedCost}
      </p>
      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium hover:bg-gray-200 transition">
          View Recipe
        </button>
      </div>
    </div>
  );
}
