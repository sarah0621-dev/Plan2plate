"use client";

import { FormEvent, useState } from "react";
import { fetchMealPlan } from "@/lib/fetchMealPlan";
import { useRouter } from "next/navigation";

export default function Home() {
  const [budget, setBudget] = useState<number>(30);
  const [days, setDays] = useState<number>(1);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCuisineChange = (c: string) => {
    setCuisine((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cuisine.length === 0) {
      alert("Please select at least one cuisine");
      return;
    }

    try {
      setLoading(true);
      const safeDays = Number.isFinite(days) && days > 0 ? Math.floor(days) : 1;
      const safeBudget =
        Number.isFinite(budget) && budget >= 0 ? Math.floor(budget) : 0;

      const meals = await fetchMealPlan({
        budget: safeBudget,
        days: safeDays,
        cuisine,
      });

      localStorage.setItem("mealPlan", JSON.stringify(meals));
      router.push("/menu");
    } catch (err) {
      console.error(err);
      alert("Error! Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Plan2Plate</h1>

      <form
        onSubmit={handleGenerate}
        className="w-full max-w-md space-y-6 bg-gray-100 p-6 rounded-xl shadow"
      >
        <div className="flex flex-col">
          <label htmlFor="budget" className="font-semibold mb-1">
            💰 Budget ($)
          </label>
          <span className="text-lg font-semibold text-blue-600">
            $ {budget}
          </span>

          <input
            type="range"
            min="30"
            max="100"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="
          w-full max-w-md h-2
          bg-gray-200 rounded-lg appearance-none cursor-pointer
          accent-blue-500
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:hover:bg-blue-600
          [&::-webkit-slider-thumb]:active:bg-blue-700
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-blue-500
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white
        "
          />
        </div>
        {/* Days */}
        <div className="flex flex-col">
          <label htmlFor="days" className="font-semibold mb-1">
            🗓️ Number of Days
          </label>
          <input
            id="days"
            type="number"
            value={days}
            min={1}
            max={7}
            step={1}
            inputMode="numeric"
            onChange={(e) => setDays(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </div>

        {/* Cuisine */}
        <div className="flex flex-col">
          <span className="font-semibold mb-1"> 🍴 Preferred Cuisine</span>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={cuisine.includes("Korean")}
              onChange={() => handleCuisineChange("Korean")}
            />
            Korean
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={cuisine.includes("Japanese")}
              onChange={() => handleCuisineChange("Japanese")}
            />
            Japanese
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={cuisine.includes("Western")}
              onChange={() => handleCuisineChange("Western")}
            />
            Western
          </label>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>
      {/* 
      {result.length > 0 && (
        <pre className="mt-6 w-full max-w-2xl overflow-auto text-sm bg-black text-white p-4 rounded-lg">
{JSON.stringify(result, null, 2)}
        </pre>
      )} */}
    </main>
  );
}
