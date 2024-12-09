"use client";
import { useContext } from "react";
import { IDataTable } from "../interfaces/componentInterfaces";
import { Icons } from "./Icons";
import { GlobalContext } from "../context";
import { usePathname } from "next/navigation";
import Input from "./Input";

const DataTable = ({ data, headers } : IDataTable) => {
    const { navigate, handleDeleteAsset, searchValue, changeSearchValue } = useContext(GlobalContext);
    const pathname = usePathname();

    return (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-4 md:p-8 pt-4 shadow-lg md:h-[77vh] overflow-auto">
            <div className="row">
                <div className="flex items-center justify-end">
                    <Icons.search className="w-6 h-6 md:w-7 md:h-7 mr-2 mt-1" />
                    <Input
                        type="text"
                        name="search"
                        value={searchValue}
                        changeEvent={(e) => changeSearchValue(e.target.value)}
                        changeKeyPressEvent={(e) => e.key === 'Backspace' && changeSearchValue((e.target as HTMLInputElement).value, e.key)}
                        placeholder="Pesquisar"
                        classCustom="p-[3px] px-2"
                    />
                </div>
            </div>
            
            <table className="w-full text-left cursor-default">
                <thead>
                    <tr>
                        {headers.map((header) => {
                            return (
                                <th key={header.key} className="p-4 text-xs md:text-base">{header.name}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="bg-mediumGray">
                    {data.length > 0 && data.map((item : any) => {
                        return (
                            <tr key={item['@key']} className='hover:bg-lightGray'>
                                {headers.map((header) => {
                                    return (
                                        header.key === 'actions'
                                        ? (
                                            <td key={header.key} className="flex items-center p-2 md:p-4 text-xs md:text-base">
                                                <Icons.eye className="cursor-pointer w-8 h-8 md:w-9 md:h-9 p-2 md:mr-2" onClick={() => navigate(`${pathname}/edit?id=${item['@key'].split(':')[1]}`, item)} />
                                                <Icons.trash className="cursor-pointer w-8 h-8 md:w-9 md:h-9 p-2 md:mr-2" color="red" onClick={() => handleDeleteAsset(item)} />
                                            </td>
                                        ) 
                                        : (
                                            <td key={header.key} className="p-2 md:p-4 text-xs md:text-base">
                                                {typeof item[header.key] === 'boolean' ? (item[header.key] ? 'Sim' : 'Não') : item[header.key]}
                                            </td>
                                        )
                                    
                                    );
                                })}
                            </tr>
                        );
                    })}

                    {data.length === 0 && (
                        <tr>
                            <td colSpan={headers.length} className="p-8 text-xs md:text-base text-center">Nenhum registro encontrado...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;