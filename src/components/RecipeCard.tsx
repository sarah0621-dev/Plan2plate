import React, { useState } from "react";
import Image from "next/image";
import DetailRecipeCard from "./DetailRecipeCard";

type RecipeCard = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
  img?: string;
  cuisine: string;
  instructions: string[];
};

export default function RecipeCard({
  meal,
  estimatedCost,
  img,
  cuisine,
  ingredients,
  instructions,
}: RecipeCard) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
          <button
            className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium hover:bg-gray-200 transition"
            onClick={toggleOpen}
          >
            View Recipe
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 sm:px-8 lg:px-16">
          <div className="absolute inset-0" onClick={toggleOpen} />
          <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
            <DetailRecipeCard
              instructions={instructions}
              onClose={toggleOpen}
              estimatedCost={estimatedCost}
              cuisine={cuisine}
              ingredients={ingredients}
              meal={meal}
            />
          </div>
        </div>
      )}
    </>
  );
}
