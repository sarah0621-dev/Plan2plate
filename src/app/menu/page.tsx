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

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if(saved) setResult(JSON.parse(saved));
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">What&apos;s This Week Plate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
  );
}
