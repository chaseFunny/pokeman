import React from "react";
import { PokemonType } from "@/type";



interface TypeSelectorProps {
  types?: PokemonType[];
  selectedTypes?: string[];
  onTypeToggle: (typeName: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  types,
  selectedTypes,
  onTypeToggle,
}) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-2">选择类型：</h3>
      <div className="flex flex-wrap gap-2">
        {types?.map((type) => (
          <button
            key={type.name}
            onClick={() => {
              onTypeToggle(type.name);
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTypes?.includes(type.name)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;