import {  useState } from "react";
import { getPokemonList } from "@/lib/api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyIfEmpty, PokemonListResponse } from "@/type";

export default function useData() {
  const [data, setData] = useState<PokemonListResponse>({});
  const [page, setPage] = useState(0);
  /**
   * 获取数据
   */
  const getData = async (limit?: number, offset?: number) => {
    try {
      const res = await getPokemonList(limit, offset);
      setData(res);
    } catch (error: AnyIfEmpty) {
      console.log(error.message);
    }
  };

  return {
    data,
    getData,
    setPage,
    page
  };
}
