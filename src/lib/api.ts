import { API_BASE_URL, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";
import { PokemonListResponse } from "@/type";

/** 获取精灵列表 */
export async function getPokemonList(limit = DEFAULT_PAGE_LIMIT, offset = DEFAULT_PAGE_OFFSET): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return response.json();
}
