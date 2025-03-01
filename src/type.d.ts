/** 列表项 */
export interface PokemonListItem {
  name: string;
  url: string;
}
/** 获取列表接口返回数据 */
export interface PokemonListResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: PokemonListItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyIfEmpty = any;
