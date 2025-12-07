"use client";

import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import {
  fetchAllRecipes,
  pickRecipeByBestTagMatch,
  type MealPlanItem,
  type RecipeApi,
} from "@/lib/fetchRecipes";

type EnrichedMeal = MealPlanItem & {
  name: string;
  image?: string;
  ingredients: string[];
};

export default function MenuPage() {
  const [result, setResult] = useState<EnrichedMeal[]>();

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if (!saved) return;

    const parsed: MealPlanItem[] = JSON.parse(saved);

    async function loadWithRecipes() {
      try {
        const recipes = await fetchAllRecipes();
        const usedIds = new Set<number>();

        const recipeCostMap = new Map<number, number>();

        const enriched: EnrichedMeal[] = parsed.map((meal) => {
          const recipe = pickRecipeByBestTagMatch(meal, recipes, usedIds);

          if (!recipe) {
            return {
              ...meal,
              name: `${meal.cuisine} ${meal.mealType}`,
              ingredients: [],
              image: undefined,
            };
          }

          usedIds.add(recipe.id);

          let cost = recipeCostMap.get(recipe.id);
          if (cost === undefined) {
            cost = meal.estimatedCost;
            recipeCostMap.set(recipe.id, cost);
          }

          return {
            ...meal,
            name: recipe.name,
            ingredients: recipe.ingredients,
            image: recipe.image,
            estimatedCost: cost,
          };
        });

        setResult(enriched);
      } catch (e) {
        console.error("Failed to load recipes", e);
      }
    }

    loadWithRecipes();
  }, []);

  return (
    <main className="font-sans min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          What&apos;s This Week Plate
        </h1>
        <div
          className={`grid gap-6 w-full 
            ${
              result?.length === 1
                ? "grid-cols-1 place-items-center"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }
          `}
        >
          {result?.map((item, idx) => (
            <RecipeCard
              key={idx}
              day={item.day}
              meal={item.name}
              ingredients={item.ingredients}
              estimatedCost={item.estimatedCost}
              img={item.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
