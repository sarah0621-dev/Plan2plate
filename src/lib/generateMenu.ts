import { mockRecipes } from "@/data/mockRecipes";

interface GenerateMenuParams {
  budget: number;
  days: number;
  cuisine?: string[];
}

export function generateMenu({ budget, days, cuisine }: GenerateMenuParams) {
  let filtered = mockRecipes.filter((r) => {
    if (!cuisine || cuisine.length === 0) return true;
    return cuisine.includes(r.cuisine);
  });

  filtered = filtered.filter((r) => r.price <= budget);

  const result = [];
  for (let i = 0; i < days; i++) {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    result.push(filtered[randomIndex]);
  }

  return result;
}
