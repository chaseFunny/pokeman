import { API_BASE_URL, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";
import { PokemonDetail, PokemonListResponse, PokemonTypeListResponse } from "@/type";

/** 获取精灵列表 */
export async function getPokemonList(limit = DEFAULT_PAGE_LIMIT, offset = DEFAULT_PAGE_OFFSET): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }
  return response.json();
}

/** 获取类型列表 */
export async function getPokemonTypes(key?: string): Promise<PokemonTypeListResponse> {
  const response = await fetch(`${API_BASE_URL}/type${key ? ('/' + key) : ''}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }
  return response.json();
}


/** 通过 id 获取精灵详情 */
export async function getPokemonDetailById(id: number): Promise<PokemonDetail> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon detail for ID ${id}`);
  }
  return response.json();
}