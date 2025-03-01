import {  useEffect, useRef, useState } from "react";
import { DEFAULT_PAGE_LIMIT } from "@/constants";
import { getPokemonList } from "@/lib/api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyIfEmpty, PokemonListResponse, changeType } from "@/type";

export default function useData() {
  const [data, setData] = useState<PokemonListResponse>({});
  const [page, setPage] = useState(0);
  const isInit =useRef(true);
  /**
   * 获取数据
   */
  const getData = async (limit?: number, offset?: number) => {
    try {
      const res = await getPokemonList(limit, offset);
      if (res.results) {
        setData(res);
      }
    } catch (error: AnyIfEmpty) {
      console.log(error.message);
    }
  };
  const changePage = (type: changeType) => {
    if (type === 'next') {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };
  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    getData(DEFAULT_PAGE_LIMIT, page * DEFAULT_PAGE_LIMIT);
  }, [page]);
  return {
    data,
    getData,
    changePage
  };
}
