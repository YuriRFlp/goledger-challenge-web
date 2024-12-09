import { ISelect, ISelectOption } from "../interfaces/componentInterfaces";

const Select = ({ options, value, name, label, changeEvent } : ISelect) => {
    return (
        <div className="flex flex-col my-4">
            <label className="text-sm" htmlFor={name}>{label}</label>
            <select
                name={name}
                value={typeof value === 'object' ? String(value['@key']) : typeof value === 'boolean' ? String(value) : value}
                onChange={changeEvent}
                className="p-2 border border-gray-300 rounded mt-1 text-black"
            >
                <option value="">Selecione uma opção</option>
                {options.map((option : ISelectOption) => (
                    <option key={String(option['@key'])} value={String(option['@key'])}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;