"use client";
import { useEffect } from "react";
import GoNextOrPrevious from "@/components/goNextOrPrevious";
import Welcome from "@/components/welcome";
import useData from "./useData";



const PokemonClientPage: React.FC = () => {
  const { data, getData , changePage} = useData();
  useEffect(() => {
    getData();
  }, []);
 
  return (
    <>
      <Welcome />
      <div>
        total count: {data?.count}
      </div>
      <div className="flex justify-center">
        <GoNextOrPrevious handleChange={changePage} next={data?.next} previous={data?.previous} />
      </div>
    </>
  );
};

export default PokemonClientPage;
