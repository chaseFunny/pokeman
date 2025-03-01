"use server";

import { getPokemonDetailById, getPokemonList, getPokemonTypes } from "@/lib/api";
import { filterPokemonDetail, findCommonPokemon } from "@/lib/utils";
import {  AnyIfEmpty, PokemonItem, PokemonListItem, PokemonListResponse, PokemonType, typePokemonItem } from "@/type";

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

/** 获取分类列表 */
export async function getTypeListAction(key?: string): Promise<{
  data?: PokemonType[],
  error: AnyIfEmpty
}>{
  let data;
  let error
  try {
    data = await getPokemonTypes(key);
  } catch (err) {
    error = err
  }
  return {
    data: data?.results,
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


/** 获取类型下的所有共同精灵 */
export async function getCommonPokemonAction(types: string[]): Promise<{
  data?: number[],
  error: AnyIfEmpty
}>{
  let data: AnyIfEmpty;
  let error
  try {
    data = await Promise.all(
          types.map((currentType: string) => getPokemonTypes(currentType).then(res => res.pokemon))
        ).then(pokemonLists => {
          return findCommonPokemon(pokemonLists as typePokemonItem[][])
        }).catch(err => {
          throw new Error(err.message || '获取精灵失败')
        });
  } catch (err) {
    error = err
  }
  return {
    data,
    error
  };
}

/** 根据 id 获取精灵详情 */
export async function getPokemonByIdAction(ids: number[]): Promise<{
  data?: PokemonItem[],
  error: AnyIfEmpty
}>{
  let pokemonList;
  let error
  try {
    const res = await Promise.all(
          ids.map(id => getPokemonDetailById(id))
    )
      if (res.length > 0) {
        pokemonList = filterPokemonDetail(res)
      } else {
        throw new Error('没有精灵')
      }
  } catch (err) {
    error = err
  }
  return {
    data: pokemonList,
    error
  };
}