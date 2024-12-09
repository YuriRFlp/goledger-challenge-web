"use client";

import Button from "@/app/components/Button";
import { Icons } from "@/app/components/Icons";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import { GlobalContext } from "@/app/context";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function SongCreate() {
    const { formData, changeFormData, handleCreateUpdateAsset, albums } = useContext(GlobalContext);
    const pathname = usePathname();
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        changeFormData(e as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <main className="w-[100%] h-[100%] px-4 md:w-[95%] md:h-auto md:h-[95%] md:min-h-[95%] py-6 md:px-8 rounded bg-black">
            <div className="md:flex items-center justify-between mb-10">
                <h1 className="text-2xl mb-5 md:mb-0">Criar Música <span className="text-base">- Preencha os campos a seguir para criar uma música.</span></h1>
                <Button text="Salvar" rounded onClick={() => handleCreateUpdateAsset(pathname.split('/')[1], 'create')}>
                    <Icons.save className="w-6 h-6 mr-2" />
                </Button>
            </div>

            <form className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-10">
                <Input
                    label="Nome"
                    type="text"
                    name="name"
                    value={formData.name}
                    changeEvent={changeFormData}
                    placeholder="Nome"
                />
                <Select
                    label="Álbum"
                    name="album"
                    value={formData.album}
                    changeEvent={handleSelectChange}
                    options={albums}
                />
            </form>
        </main>
    );
}