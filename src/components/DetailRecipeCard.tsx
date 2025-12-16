type RecipeCardDetail = {
  meal: string;
  ingredients: string[];
  estimatedCost: number;
  img?: string;
  cuisine: string;
  instructions: string[];
  onClose?: () => void;
};

export default function DetailRecipeCard({
  onClose,
  cuisine,
  ingredients,
  estimatedCost,
  meal,
  instructions,
}: RecipeCardDetail) {
  return (
    <div className="relative w-full rounded-2xl bg-white shadow-xl overflow-hidden max-h-[85vh]">
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-dashed border-b">
        <div>
          <h2 className="text-lg font-semibold">{meal}</h2>
          <p className="mt-1 text-sm text-gray-500">{cuisine}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="px-5 py-4 overflow-y-auto max-h-[calc(85vh-72px)] pb-8 space-y-5">
        <p className="text-sm text-gray-700">
          Estimated Cost: <span className="font-medium">${estimatedCost}</span>
        </p>

        {ingredients.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {instructions.length > 0 && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-3">Steps</h3>
            <ol className="space-y-4">
              {instructions.map((item, i) => (
                <li key={i} className="flex gap-3">
                  {/* Step number */}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                    {i + 1}
                  </span>

                  {/* Step text */}
                  <p className="text-sm leading-relaxed text-gray-700">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
