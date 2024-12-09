import { IMultiSelect, ISelectOption } from "../interfaces/componentInterfaces";
import { Icons } from "./Icons";

const MultiSelect = ({ options, name, value, listName, label, list, selectEvent, changeEvent } : IMultiSelect) => {
    const handleSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const item = options.find((option) => option.name === e.currentTarget.value);
            item && selectEvent({ id: String(item['@key']), name: item.name });
        }
    };

    return (
        <>
            <div className="flex flex-col my-4">
                <label className="text-sm" htmlFor={name}>{label}</label>
                <input
                    onKeyUp={(event) => handleSelect(event)}
                    list={listName}
                    id={name}
                    name={name}
                    value={value}
                    onChange={changeEvent}
                    className="p-2 border border-gray-300 rounded mt-1 text-black"
                    placeholder="Selecione uma opção e pressione Enter"
                />
                <datalist id={listName} className="p-2 border border-gray-300 rounded mt-1 text-black">
                    {options.map((option : ISelectOption) => (
                        <option key={String(option['@key'])} value={String(option.name)}>
                            {option.name}
                        </option>
                    ))}
                </datalist>
            </div>
            <div className="flex flex-col my-4">
                {list.map((item : { id: string, name: string }) => (
                    <div className="flex items-center mb-3" key={item.id}>
                        <Icons.check className="w-6 h-6 text-green mr-2" />
                        <span>{item.name}</span>
                    </div>
                ))}
                {list.length > 0 && <p className="text-sm mt-5 text-lightGray cursor-default">Para remover a opção desejada, selecione ela e pressione Enter novamente</p>}
            </div>
        </>
        
    )
}

export default MultiSelect;