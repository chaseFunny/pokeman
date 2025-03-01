import { useState } from 'react';
import { toast } from 'sonner';
import { PokemonDetail, PokemonItem, PokemonListItem } from '@/type';
import { filterPokemonDetail } from '@/lib/utils';

/** 获取精灵详情数据 */
export default function usePokemonData() {
  const [loading, setLoading] = useState(true);
  const [detailsList, setDetailsList] = useState<PokemonItem[] >([]);

  const fetchData = async (dataList?: PokemonListItem[]) => {
    if (!dataList) return;
    try {
      setLoading(true);
      if (dataList?.length > 0) {
        // 使用 Promise.all 并行请求所有详情
        const detailsData: PokemonDetail[] = await Promise.all(
          dataList.map(pokemon => 
            fetch(pokemon.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`详情请求失败: ${response.status}`);
                }
                return response.json();
              })
          )
        );
        const filterData = filterPokemonDetail(detailsData);
        if (filterData.length > 0) {
          setDetailsList(filterData);
        } else {
          toast('获取精灵数据失败')
        }
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };
  


  return {fetchData, detailsList, loading };
}