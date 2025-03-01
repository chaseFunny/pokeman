'use server'

import { getCommonPokemonAction, getPokemonByIdAction, getPokemonDetailListAction, getPokemonListAction, getTypeListAction } from "./actions";
import { PokemonList } from "@/components/PokemonList";
import GoNextOrPreviousServer from "@/components/goNextOrPreviousServer";
import TypeSelectorServer from "@/components/typeSelectServer";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";




/** 服务端页面 */
export default async function PokemonPage({
  searchParams
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined }
}>) {
  const params= await searchParams

  const page = Number(params.page ?? 0)
  const type = [...(new Set(typeof params.type === 'string' ? params.type.split(',') : params.type))]
  
  const { data, error } = await getPokemonListAction(DEFAULT_PAGE_LIMIT, page > 1 ? (page - 1) * DEFAULT_PAGE_LIMIT : DEFAULT_PAGE_OFFSET)
  if (error) {
    return (
      <div>{error.message}</div>
    );
  }

  const { data: typeData, error:typeError } = await getTypeListAction()
   
  const { data: detailData, error: detailError } = await getPokemonDetailListAction(data?.results)
  const isType = type.filter(ele => !!ele).length > 0
  let commonData: number[] = []
  let commonError
  let typePokemonData
  let typePokemonError
  if (isType) {
    const { data: cData, error: cErr } = await getCommonPokemonAction(type)
    commonData = cData ?? []
    commonError = cErr
    const start = page > 1 ? (page - 1) * DEFAULT_PAGE_LIMIT : DEFAULT_PAGE_OFFSET
    const end = start + DEFAULT_PAGE_LIMIT
    const { data: idsData, error: idsErr } = await getPokemonByIdAction((commonData ?? []).slice(start, end))
    typePokemonData = idsData
    typePokemonError = idsErr
  }
  
  const renderData= isType? typePokemonData : detailData
  const total = isType ? commonData?.length : data?.count
  return (
    <div>
      <TypeSelectorServer page={page}  types={typeData}  selectedTypes={type} />
      {(detailData || typePokemonData) && <PokemonList pokemonList={renderData} />}
        <div className="flex justify-center">
        <GoNextOrPreviousServer page={page}  total={total ?? 0} type={type}  />
      </div>
      {typeError?.message && <div>{typeError.message}</div>}
      {error?.message && <div>{error.message}</div>}
      {detailError?.message && <div>{detailError.message}</div>}
      {typePokemonError?.message && <div>{typePokemonError.message}</div>}
      {commonError?.message && <div>{commonError.message}</div>}
    </div>
  );
}