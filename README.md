# Plan2Plate

This project generates weekly meal plans based on budget, cuisine preferences, and number of days.
Meals are enriched with real recipe images and ingredients using the DummyJSON Recipes API, with a fallback image system for unmatched dishes.

## Tech Stack
- Next.js (React)
- TypeScript
- Tailwind CSS
- OpenAI API
- DummyJSON Recipes API
- LocalStorage


## 📁 Project Structure

src/
 ├─ app/
 │   ├─ api/
 │   │   └─ generateMeal/route.ts      // OpenAI meal plan generator
 │   ├─ menu/page.tsx                  // Menu page UI logic
 │   └─ page.tsx
 ├─ components/
 │   └─ RecipeCard.tsx                 // Meal card UI component
 ├─ lib/
 │   ├─ fetchAllRecipes.ts             // DummyJSON API fetcher
 │   ├─ pickRecipeByBestTagMatch.ts    // Recipe matching logic
 │   └─ getFallbackImage.ts            // Cuisine-based fallback images
public/
 └─ fallback/                          // Fallback images by cuisine
 

## 🛠️ Getting Started
```bash
npm install
npm run dev
# visit http://localhost:3000
