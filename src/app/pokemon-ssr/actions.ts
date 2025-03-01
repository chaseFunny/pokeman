"use server";

import { getPokemonList } from "@/lib/api";
import { filterPokemonDetail } from "@/lib/utils";
import {  AnyIfEmpty, PokemonItem, PokemonListItem, PokemonListResponse } from "@/type";

/** 获取精灵列表 */
export async function getPokemonListAction(limit?: number, offset?: number): Promise<{
  data?: PokemonListResponse,
  error: AnyIfEmpty
}>{
  let pokemonList;
  let error
  try {
    pokemonList = await getPokemonList(limit, offset);
  } catch (err) {
    error = err
  }
  return {
    data: pokemonList,
    error
  };
}

/** 获取精灵详情列表 */
export async function getPokemonDetailListAction(dataList?: PokemonListItem[]): Promise<{
  data?: PokemonItem[],
  error?: AnyIfEmpty
}> {
  if (!dataList) return {}
  let data;
  let error
  try {
  const res = await Promise.all(
          dataList.map(pokemon => 
            fetch(pokemon.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`详情请求失败: ${response.status}`);
                }
                return response.json();
              })
          )
  )
    data = filterPokemonDetail(res);
  } catch (err) {
    error = err
  }
  return {
    data,
    error
  };
}