export type RecipeApi = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  tags: string[];
  mealType: string[];
  ingredients: string[];
};

type RecipeListResponse = {
  recipes: RecipeApi[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchAllRecipes(): Promise<RecipeApi[]> {
  const res = await fetch("https://dummyjson.com/recipes?limit=200");

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data: RecipeListResponse = await res.json();
  return data.recipes;
}

export type MealPlanItem = {
  day: string;
  cuisine: string;
  mealType: string;
  tags: string[];
  estimatedCost: number;
};


export function pickRecipeByBestTagMatch(
  meal: MealPlanItem,
  recipes: RecipeApi[],
    usedIds: Set<number>
): RecipeApi | null {
  const mealCuisine = meal.cuisine.toLowerCase();
  const mealTags = meal.tags.map((t) => t.toLowerCase());


   const sameCuisineRecipes = recipes.filter(
    (r) =>
      r.cuisine.toLowerCase() === mealCuisine && !usedIds.has(r.id)
  );

  
  const candidates =
    sameCuisineRecipes.length > 0
      ? sameCuisineRecipes
      : recipes.filter((r) => r.cuisine.toLowerCase() === mealCuisine);

  if (candidates.length === 0) return null;

  
  const scored = candidates.map((recipe) => {
    const recipeTags = recipe.tags.map((t) => t.toLowerCase());
    const overlapCount = mealTags.filter((tag) =>
      recipeTags.includes(tag)
    ).length;

    return { recipe, score: overlapCount };
  });

  const maxScore = Math.max(...scored.map((s) => s.score));

  
  const bestMatches = scored.filter((s) => s.score === maxScore);

  
  const chosen =
    bestMatches[Math.floor(Math.random() * bestMatches.length)].recipe;

  return chosen;
  };

