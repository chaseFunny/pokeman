'use server'

import { getPokemonDetailListAction, getPokemonListAction } from "./actions";
import { PokemonList } from "@/components/PokemonList";
import GoNextOrPreviousServer from "@/components/goNextOrPreviousServer";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/constants";

/** 服务端页面 */
export default async function PokemonPage({
  searchParams
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined }
}>) {
  const params= await searchParams
  console.log(params, 123);
  const page = Number(params.page ?? 0)
  const type = params.type
  const { data, error } = await getPokemonListAction(DEFAULT_PAGE_LIMIT, page > 1 ? (page - 1) * DEFAULT_PAGE_LIMIT : DEFAULT_PAGE_OFFSET)
  if (error) {
    return (
      <div>{error.message}</div>
    );
  }
  const { data: detailData, error: detailError } = await getPokemonDetailListAction(data?.results)
  console.log(detailData, detailError);
    if (detailError) {
    return (
      <div>{detailError.message}</div>
    );
  }
  return (
    <div>
      {detailData && <PokemonList pokemonList={detailData} />}
       <div className="flex justify-center">
        <GoNextOrPreviousServer page={page}  total={data?.count ?? 0} type={type}  />
      </div>
    </div>
  );
}