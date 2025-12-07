import React from "react";
import Image from "next/image";

type Meal = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
  img?: string;
};

export default function RecipeCard({
  day,
  meal,
  ingredients,
  estimatedCost,
  img,
}: Meal) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm ">
      {img && (
        <Image
          src={img}
          alt={meal}
          width={300}
          height={200}
          className="rounded-xl object-cover w-full h-48"
        />
      )}
      <h2 className="text-lg font-bold">{day}</h2>
      <h3 className="text-ml font-semibold">{meal}</h3>
      <p className="text-sm text-gray-500">{ingredients.join(", ")}</p>
      <p className="text-sm text-gray-500">
        {" "}
        Estimated Cost : ${estimatedCost}
      </p>
    </div>
  );
}
