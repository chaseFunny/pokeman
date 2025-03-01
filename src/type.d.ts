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


export type changeType = 'next' | 'previous'


/** 精灵详情接口返回数据 */
export interface PokemonDetail {
  id: number;
  name: string;
  order: number;
  sprites: {
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
}


// 精灵详情转化数据
export interface PokemonItem {
  name: string;
  id: number;
  order: number;
  image: string;
}