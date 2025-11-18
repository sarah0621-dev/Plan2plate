import React from "react";

type Meal = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
};

export default function RecipeCard({
  day,
  meal,
  ingredients,
  estimatedCost,
}: Meal) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm ">
      <h2 className="text-lg font-bold">{day}</h2>
      <h3 className="text-ml font-semibold">{meal}</h3>
      <p className="text-sm text-gray-500">{ingredients.join(", ")}</p>
      <p className="text-sm text-gray-500"> Estimated Cost : ${estimatedCost}</p>
    </div>
  );
}
