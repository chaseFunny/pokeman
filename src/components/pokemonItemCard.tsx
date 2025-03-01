
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PokemonItem } from "@/type";

interface PokemonCardProps {
  pokemon: PokemonItem;
}

export function PokemonCard({ pokemon }: Readonly<PokemonCardProps>) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group border-none py-0 px-1">
      <div className="p-2 flex flex-col items-center">
        {/* 名称 */}
        <h3 className="font-bold text-lg capitalize mb-1">{pokemon.name}</h3>
        
        {/* 图片容器 */}
        <CardContent className="flex justify-center items-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <div className="relative h-36 w-36 group-hover:scale-110 transition-transform duration-300">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
        </CardContent>
        
        {/* 序号 */}
        <CardFooter className="pt-2 px-0">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            Number: {pokemon.id}
          </Badge>
        </CardFooter>
      </div>
    </Card>
  );
}