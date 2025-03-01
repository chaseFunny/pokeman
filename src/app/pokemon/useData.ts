import { useSearchParams,useRouter  } from "next/navigation";
import {  useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";
import { getPokemonList } from "@/lib/api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyIfEmpty, PokemonListResponse, changeType } from "@/type";


export default function useData() {
  const [data, setData] = useState<PokemonListResponse>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInit = useRef(true);
  
    // 从 URL 参数中获取当前页码，默认为 0
  const page = Number(searchParams.get('page') || DEFAULT_PAGE_OFFSET);
  /**
   * 获取数据
   */
  const getData = async (limit?: number, offset?: number) => {
    try {
      setLoading(true);
      const res = await getPokemonList(limit, page > 1 ? (page - 1) * DEFAULT_PAGE_LIMIT : offset);
      if (res.results) {
        setData(res);
      }
    } catch (error: AnyIfEmpty) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
 const changePage = (type: changeType) => {
    const newPage = type === 'next' ? page + 1 : Math.max(0, page - 1);
    
    // 创建新的 URL 搜索参数
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    // 更新路由
    router.push(`?${params.toString()}`);
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
    setData,
    getData,
    changePage,
    loading,
    page
  };
}
