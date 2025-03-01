"use client";
import { useEffect } from "react";
import { PokemonList } from "@/components/PokemonList";
import GoNextOrPrevious from "@/components/goNextOrPrevious";
import Welcome from "@/components/welcome";
import useData from "./useData";
import usePokemonData from "./usePokemonDetail";



const PokemonClientPage: React.FC = () => {
  const { data, getData, changePage, loading: dataLoading , page} = useData();
  const {fetchData, detailsList, loading} = usePokemonData();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if ((data?.results?.length  ?? 0)> 0) fetchData(data?.results);
  }, [data]);
  
  return (
    <>
      <Welcome />
      <div className="my-4 text-center text-gray-400">
        total count: {data?.count}，current page: {page}
      </div>
      {detailsList && <PokemonList pokemonList={detailsList} isLoading={loading || dataLoading} />}
      <div className="flex justify-center">
        <GoNextOrPrevious handleChange={changePage} next={data?.next} previous={data?.previous} />
      </div>
    </>
  );
};

export default PokemonClientPage;
