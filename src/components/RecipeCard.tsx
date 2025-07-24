import React from "react";

interface RecipeCardProps {
  name: string;
  cuisine: string;
  image: string;
}

export default function RecipeCard({ name, cuisine, image }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{cuisine}</p>
    </div>
  );
}
