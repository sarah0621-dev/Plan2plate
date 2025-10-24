import RecipeCard from "@/components/RecipeCard";

export default function MenuPage() {
  // example data
  const menu = [
    { name: "Kimchi Fried Rice", cuisine: "Korean", image: "/kimchi.jpg" },
    { name: "Pasta", cuisine: "Italian", image: "/pasta.jpg" },
    { name: "Sushi", cuisine: "Japanese", image: "/sushi.jpg" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">What&apos;s This Week Plate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item, idx) => (
          <RecipeCard
            key={idx}
            name={item.name}
            cuisine={item.cuisine}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
