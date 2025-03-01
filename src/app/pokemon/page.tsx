"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PokemonList } from "@/components/PokemonList";
import GoNextOrPrevious from "@/components/goNextOrPrevious";
import TypeSelector from "@/components/typeSelect";
import Welcome from "@/components/welcome";
import { getTypeArrayFromUrl } from "@/lib/utils";
import useData from "./useData";
import usePokemonData from "./usePokemonDetail";
import useType from "./useType";

const Loading = (): React.ReactElement => {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

const PokemonClientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { data, getData, changePage, loading: dataLoading , page} = useData();
  const { fetchData, detailsList, loading } = usePokemonData();
  const { getTypeData, loading: typeLoading, typeList, typeToggle, canNext,canPrev, pokemonDetailList } = useType();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getTypeData();
  },[])

  useEffect(() => {
    if ((data?.results?.length  ?? 0)> 0) fetchData(data?.results);
  }, [data]);

  const isType = pokemonDetailList.length > 0

  return (
    <>
      <Welcome />
      { dataLoading || loading ? <Loading /> :<div className="my-4 text-center text-gray-400">
        total count: {data?.count}，current page: {page}
      </div>}
      {
        typeLoading ? 
          <Loading /> :
          <TypeSelector onTypeToggle={typeToggle}  types={typeList}  selectedTypes={getTypeArrayFromUrl(searchParams)} />
      }
      {(detailsList || pokemonDetailList) && <PokemonList pokemonList={isType ? pokemonDetailList : detailsList} isLoading={loading || dataLoading} />}
      <div className="flex justify-center">
        <GoNextOrPrevious handleChange={changePage} next={isType ? canNext  : data?.next} previous={isType ? canPrev  :data?.previous} />
      </div>
    </>
  );
};

export default PokemonClientPage;
