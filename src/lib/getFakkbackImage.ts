export function getFallbackImage(cuisine: string): string {
  const c = cuisine.toLowerCase();

  if (c.includes("korean")) return "/fallback/korean.jpg";
  if (c.includes("japanese")) return "/fallback/Japanese1.jpg";
  if (c.includes("western")) return "/fallback/Western.jpg";

  return "/fallback/default.jpg";
}
