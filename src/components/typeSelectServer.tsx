'use client'
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { PokemonType } from "@/type";
import TypeSelector from "./typeSelect";

interface TypeSelectorProps {
  page?: number;
  types?: PokemonType[];
  selectedTypes?: string[];
}

const TypeSelectorServer: React.FC<TypeSelectorProps> = ({
  page,
  types,
  selectedTypes,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toggle = (t: string) => {
    // 创建新的URLSearchParams对象，复制当前所有参数
    const params = new URLSearchParams(searchParams.toString());
    console.log(params, 'params');
    
    // 检查type是否已在数组中
    const typeIndex = selectedTypes?.indexOf(t);
    
    let newTypes: string[];
    if (( !typeIndex || typeIndex === -1) && typeIndex !== 0) {
      // 如果不存在，添加此type
      newTypes = [...(selectedTypes ?? []), t];
    } else {
      // 如果已存在，删除此type
      newTypes = [...(selectedTypes ?? [])];
      newTypes.splice((typeIndex ?? 0), 1);
    }
    console.log(typeIndex,newTypes, t,'newTypes');
    
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
    const newUrl = `/pokemon-ssr${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  }
  return (
    <TypeSelector types={types} selectedTypes={selectedTypes} onTypeToggle={toggle}  />
  );
};

export default TypeSelectorServer;