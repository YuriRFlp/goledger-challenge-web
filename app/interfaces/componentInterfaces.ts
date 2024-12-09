import { ChangeEventHandler } from "react";
import { IAsset } from "./contextInterfaces";

export interface IDataTable {
    data: [] | IAsset[];
    headers: { name: string, key: string }[];
}

export interface IButton {
    text: string;
    onClick: () => void;
    rounded?: boolean;
    children?: React.ReactNode;
}

export interface IInput {
    type: string;
    name: string;
    value?: string | number;
    label?: string;
    placeholder?: string;
    classCustom?: string;
    readonly?: boolean;
    changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeKeyPressEvent?: React.KeyboardEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

export interface ISelectOption {
    '@key': string | boolean;
    name: string;
}

export interface ISelect {
    options: ISelectOption[];
    value?: string | { '@assetType': string; '@key': string; } | boolean;
    name: string;
    label: string;
    changeEvent: ChangeEventHandler<HTMLSelectElement>;
}

export interface IMultiSelect {
    options: ISelectOption[];
    value?: any;
    name: string;
    listName: string;
    label: string;
    changeEvent: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    selectEvent: (item: { id: string; name: string; }) => void;
    list: { id: string, name: string }[];
}
