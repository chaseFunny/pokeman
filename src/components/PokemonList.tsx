
import { PokemonItem } from "@/type";
import { PokemonCard } from "./pokemonItemCard";

interface PokemonListProps {
  pokemonList?: PokemonItem[];
  isLoading?: boolean;
}

export function PokemonList({ pokemonList, isLoading = false }: Readonly<PokemonListProps>) {
  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {pokemonList?.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

// 骨架屏加载状态
function PokemonListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div 
          key={index} 
          className="h-60 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
}