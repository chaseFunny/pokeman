import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PokemonDetail, PokemonItem } from "@/type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/** 获取精灵详情内有用的数据 */
export const filterPokemonDetail = (data: PokemonDetail[]): PokemonItem[] => {
  return data.map(item => {
    return {
      name: item.name,
      id: item.id,
      order: item.order,
      image: item.sprites.other.showdown.front_default,
    }
  })
}