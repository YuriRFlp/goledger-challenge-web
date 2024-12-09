import { ChangeEventHandler } from "react";

export interface IMenuItem {
    label: string;
    tag: any;
}

export interface ISearchInput {
    name: string;
    '@key': string;
}

export interface IAsset {
    assetType?: string;
    '@assetType'?: string;
    name: string;
    country?: string;
    year?: string;
    artist?: string | { '@assetType': string, '@key': string };
    album?: string | { '@assetType': string, '@key': string };
    songs?: string | { '@assetType': string, '@key': string } | { '@assetType': string, '@key': string }[];
    newSongs?: string | { '@assetType': string, '@key': string } | { '@assetType': string, '@key': string }[];
    private?: boolean;
}

export interface IGlobalContext {
    menu: IMenuItem[];
    data: IAsset[];
    handleInitMenu: (new_menu: []) => void;
    handleSearchNavigation: (tag: string) => void;
    handleDeleteAsset: (item: {}) => void;
    handleCreateUpdateAsset: (assetType : string, action: string) => void;
    navigate: (path: string, payload?: IAsset | null) => void;
    formData: IAsset;
    changeFormData: ChangeEventHandler<HTMLInputElement>;
    artists: ISearchInput[];
    albums: ISearchInput[];
    songs: ISearchInput[];
    multiSelect: { id: string, name: string }[];
    changeMultiSelect: (item: { id: string, name: string }) => void;
    loading: boolean;
    searchValue: string | number;
    changeSearchValue: (value: string | number, keyPress?: string) => void;
}