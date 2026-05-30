import { LayoutGrid, UtensilsCrossed, Pizza, Coffee, Fish } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Categoria } from "../types";

const ICON_MAP: Record<string, LucideIcon> = {
  pizza: Pizza,
  bebida: Coffee,
  sushi: Fish,
};

function getCategoryIcon(nombre: string): LucideIcon {
  const lower = nombre.toLowerCase();
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return Icon;
  }
  return UtensilsCrossed;
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
          className={`h-14 w-14 rounded-full flex items-center justify-center transition ${
            selected === null ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <LayoutGrid className="w-6 h-6" />
        </div>
        <span
          className={`text-xs font-medium ${
            selected === null ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          Todos
        </span>
      </button>

      {categories.map((cat) => {
        const Icon = getCategoryIcon(cat.nombre);
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center transition ${
                selected === cat.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span
              className={`text-xs font-medium ${
                selected === cat.id ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              {cat.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}
