"use client";

import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

type Meal = {
  day: string;
  meal: string;
  ingredients: string[];
  estimatedCost: number;
};

export default function MenuPage() {
  const [result, setResult] = useState<Meal[]>();
  console.log(result);
  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  return (
    <main className="font-sans min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          What&apos;s This Week Plate
        </h1>
        <div className={`grid gap-6 w-full 
            ${result?.length === 1 
              ? "grid-cols-1 place-items-center"             
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}
          `}>
          {result?.map((item, idx) => (
            <RecipeCard
              key={idx}
              day={item.day}
              meal={item.meal}
              ingredients={item.ingredients}
              estimatedCost={item.estimatedCost}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
