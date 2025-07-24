import RecipeCard from "@/components/RecipeCard";

export default function MenuPage() {
  // example data
  const menu = [
    { name: "김치볶음밥", cuisine: "Korean", image: "/kimchi.jpg" },
    { name: "파스타", cuisine: "Italian", image: "/pasta.jpg" },
    { name: "초밥", cuisine: "Japanese", image: "/sushi.jpg" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">오늘의 식단</h1>
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
