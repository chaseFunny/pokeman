import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { PokemonDetail, PokemonItem, typePokemonItem } from "@/type"

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
      image: item.sprites.other.showdown.front_default ?? item.sprites.front_default,
    }
  })
}

/**
 * 从精灵URL中提取ID
 * @param url 精灵URL，例如 "https://pokeapi.co/api/v2/pokemon/41/"
 * @returns 提取的ID数字
 */
function extractPokemonIdFromUrl(url: string): number {
  // 使用正则表达式从URL中提取ID
  const matches = url.match(/\/pokemon\/(\d+)\/?$/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  return -1; // 如果无法提取ID，返回-1
}

/**
 * 查找多个类型共有的精灵
 * @param typePokemonArrays 多个类型的精灵数组集合
 * @returns 所有类型中都存在的精灵数组
 */
export function findCommonPokemon(typePokemonArrays: typePokemonItem[][]): number[] {
  // 如果没有数据，返回空数组
  if (!typePokemonArrays.length) return [];
  
  // 如果只有一个类型，直接返回该类型的所有精灵
  if (typePokemonArrays.length === 1) {
    const arr = typePokemonArrays[0].flatMap(item => item.pokemon)
    return arr.map(pokemon => extractPokemonIdFromUrl(pokemon.url)).filter(id => id !== -1);
  }
  
  // 提取第一个类型的所有精灵作为初始集合
  let commonPokemon = typePokemonArrays[0].flatMap(item => item.pokemon);
  
  // 依次与其他类型求交集
  for (let i = 1; i < typePokemonArrays.length; i++) {
    const currentTypePokemons = typePokemonArrays[i].flatMap(item => item.pokemon);
    
    // 根据name属性求交集
    commonPokemon = commonPokemon.filter(pokemon => 
      currentTypePokemons.some(p => p.name === pokemon.name)
    );
  }
  
 // 将结果转换为ID数组
  return commonPokemon.map(pokemon => extractPokemonIdFromUrl(pokemon.url)).filter(id => id !== -1);
}


 // 从 URL 参数中获取 type，并处理成数组
 export const getTypeArrayFromUrl = (searchParams: ReadonlyURLSearchParams ): string[] => {
    const typeParam = searchParams.get('type');
    if (!typeParam) return [];
    return typeParam.split(',');
  };