"use client";

import { useContext } from "react";
import { GlobalContext } from "../context";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import { Icons } from "../components/Icons";

export default function Artist() {
  const { data, navigate } = useContext(GlobalContext);
  
  return (
    <main className="w-[100%] h-[100%] px-4 md:w-[95%] md:h-auto md:h-[95%] md:min-h-[95%] py-6 md:px-8 rounded bg-black">
      <div className="md:flex items-center justify-between mb-10">
        <h1 className="text-2xl mb-5 md:mb-0">Músicas <span className="text-base">- Confira a seguir a lista das músicas disponíveis.</span></h1>
        <Button text="Adicionar" rounded onClick={() => navigate('/song/create')}>
          <Icons.plus className="w-6 h-6 mr-2" />
        </Button>
      </div>
      
      <DataTable data={data} headers={[
        {name: 'Nome', key: 'name'},
        {name: 'Ações', key: 'actions'},
      ]} />
    </main>
  );
}
