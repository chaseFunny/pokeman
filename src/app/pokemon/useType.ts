import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";
import { getPokemonDetailById, getPokemonTypes } from "@/lib/api";
import { filterPokemonDetail, findCommonPokemon, getTypeArrayFromUrl } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyIfEmpty, PokemonItem, PokemonType, typePokemonItem } from "@/type";


export default function useType() {
  const [loading, setLoading] = useState(true);
  const [typeList, setTypeList] = useState<PokemonType[]>([]);
  // 类型下的数据列表
  const [typeDataList, setTypeDataList] = useState<number[]>([]);
  // 是否可以上一页，下一页
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  // 分类下精灵数据详情
  const [pokemonDetailList, setPokemonDetailList] = useState<PokemonItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
    // 从 URL 参数中获取当前页码，默认为 0
  const page = Number(searchParams.get('page') || DEFAULT_PAGE_OFFSET);
  const isInit = useRef(true);
  

  /** 获取数据 */
  const getTypeData = async (key?: string) => {
    try {
      setLoading(true);
      const res = await getPokemonTypes(key)
      if (res.results.length > 0) {
        setTypeList(res.results);
      } else {
        toast.error("Failed to fetch Pokemon types");
      }
    } catch (error: AnyIfEmpty) {
      toast.error( error.message ??"Failed to fetch Pokemon types");
    } finally {
      setLoading(false);
    }
  };

  /** 切换类型 */
  const typeToggle = (type: string) => {
    // 获取当前URL中的type数组
    const currentTypes = getTypeArrayFromUrl(searchParams);
    
    // 创建新的URLSearchParams对象，复制当前所有参数
    const params = new URLSearchParams(searchParams.toString());
    
    // 检查type是否已在数组中
    const typeIndex = currentTypes.indexOf(type);
    
    let newTypes: string[];
    if (typeIndex === -1) {
      // 如果不存在，添加此type
      newTypes = [...currentTypes, type];
    } else {
      // 如果已存在，删除此type
      newTypes = [...currentTypes];
      newTypes.splice(typeIndex, 1);
    }

    // 更新URL参数
    if (newTypes.length > 0) {
      params.set('type', newTypes.join(','));
      if (!page || page > 1) {
        params.set('page', '1');
      }
    } else {
      params.delete('type');
    }

    // 构建新URL并导航
    const newUrl = `/pokemon${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };
    // 检查某个type是否被选中
  const isTypeSelected = (type: string): boolean => {
    return getTypeArrayFromUrl(searchParams).includes(type);
  };
  const routeType = getTypeArrayFromUrl(searchParams)
  // 当类型变化，获取类型下的数据
  useEffect(() => {
      if (isInit.current) {
        isInit.current = false;
      }
    if (routeType.length === 0) return;
    if (routeType.length > 0) {
        Promise.all(
          routeType.map(currentType => getPokemonTypes(currentType).then(res => res.pokemon))
        ).then(pokemonLists => {
          setTypeDataList(findCommonPokemon(pokemonLists as typePokemonItem[][]))
        });
      }
  }, [routeType.toString()]);
  
  /** 类型中的获取数据列表 */
  const getTypePokemonData = async(ids: number[]) => {
    try {
        const res = await Promise.all(
          ids.map(id => getPokemonDetailById(id))
        )
      if (res.length > 0) {
        const filterRes = filterPokemonDetail(res)
        setPokemonDetailList(filterRes)
      } else {
        toast('没有精灵')
      }
      
      
    } catch (error) {
      toast(error instanceof Error ? error.message : '获取精灵列表失败')
    }
  }

  useEffect(() => {
    if (!page || page === 0) return;
    if (typeDataList.length <= 0) return;
    if (typeDataList.length > DEFAULT_PAGE_LIMIT) {
      const start = page * DEFAULT_PAGE_LIMIT - DEFAULT_PAGE_LIMIT;
      const end = page * DEFAULT_PAGE_LIMIT;
      getTypePokemonData(typeDataList.slice(start, end))
      setCanNext(typeDataList.length > end);
      setCanPrev(page > 1);
    } else {
      getTypePokemonData(typeDataList);
      setCanNext(false);
    }
   
  }, [typeDataList.toString(), page]);
  return {
    loading,
    typeList,
    getTypeData,
    typeToggle,
    isTypeSelected,
    canNext,
    canPrev,
    pokemonDetailList
  };
}