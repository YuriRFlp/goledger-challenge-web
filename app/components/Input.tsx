import { IInput } from "../interfaces/componentInterfaces";

const Input = ({ label, type, name, value, changeEvent, changeKeyPressEvent, placeholder, disabled, readonly, classCustom } : IInput) => {
    return (
        <div className="flex flex-col my-4">
            <label className="text-sm" htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={changeEvent}
                onKeyUp={changeKeyPressEvent}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readonly}
                className={`p-2 border border-gray-300 rounded mt-1 text-black ${classCustom}`}
            />
        </div>
    )
}

export default Input;