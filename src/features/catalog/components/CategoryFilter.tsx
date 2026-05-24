import type { Categoria } from "../types";

const EMOJI_MAP: Record<string, string> = {
  hamburguesa: "🍔",
  pizza: "🍕",
  bebida: "🥤",
  postre: "🍰",
  ensalada: "🥗",
  acompañamiento: "🍟",
  pollo: "🍗",
  pasta: "🍝",
  sushi: "🍱",
  sandwich: "🥪",
};

function getCategoryEmoji(nombre: string): string {
  const lower = nombre.toLowerCase();
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(key)) return emoji;
  }
  return "🍽️";
}

interface CategoryFilterProps {
  categories: Categoria[];
  selected: number | null;
  onChange: (id: number | null) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      <button
        onClick={() => onChange(null)}
        className="flex flex-col items-center gap-1.5 flex-shrink-0"
      >
        <div
          className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl transition ${
            selected === null ? "bg-indigo-600" : "bg-gray-100"
          }`}
        >
          🏠
        </div>
        <span
          className={`text-xs font-medium ${
            selected === null ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          Todos
        </span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <div
            className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl transition ${
              selected === cat.id ? "bg-indigo-600" : "bg-gray-100"
            }`}
          >
            {getCategoryEmoji(cat.nombre)}
          </div>
          <span
            className={`text-xs font-medium ${
              selected === cat.id ? "text-indigo-600" : "text-gray-500"
            }`}
          >
            {cat.nombre}
          </span>
        </button>
      ))}
    </div>
  );
}
