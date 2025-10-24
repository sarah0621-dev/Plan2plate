export async function fetchMealPlan({
  budget,
  days,
  cuisine,
}: {
  budget: number;
  days: number;
  cuisine: string[];
}) {
  const res = await fetch("/api/generateMeal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ budget, days, cuisine }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API ERROR:", errorText);
    throw new Error("Fail to generate Mealplan");
  }

  const data = await res.json();

  if (!data.mealPlan) {
    throw new Error("Invalid Response: mealPlan not found");
  }

  return data.mealPlan;
}
