"use client";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { IAsset, IGlobalContext, IMenuItem, ISearchInput } from "../interfaces/contextInterfaces";
import { ApiServices } from "../services";
import { redirect, usePathname, useRouter } from "next/navigation";
import { isRequired } from "../utils/validators";
import { toast } from 'react-toastify';

export const GlobalContext = createContext<IGlobalContext>({
    menu: [],
    data: [],
    handleInitMenu: () => {},
    handleSearchNavigation: () => {},
    handleCreateUpdateAsset: () => {},
    handleDeleteAsset: () => {},
    navigate: () => {},
    formData: {
        assetType: '',
        name: '',
    },
    changeFormData: () => {},
    artists: [],
    albums: [],
    songs: [],
    multiSelect: [],
    changeMultiSelect: () => {},
    loading: false,
    searchValue: '',
    changeSearchValue: () => {},
});

const  GlobalProvider = ({ children } : Readonly<{ children: React.ReactNode}>) => {
    const apiInstance = new ApiServices();
    const pathname = usePathname();
    const router = useRouter();

    const [ menu, setMenu ] = useState<IMenuItem[]>([]);
    const [ data, setData ] = useState<IAsset[]>([]);
    const [ dataHistory, setDataHistory ] = useState<{ [key: string]: IAsset[] | undefined }>({});
    const [ multiSelect, setMultiSelect ] = useState<{ id: string, name: string }[]>([]);
    const [ artists, setArtists ] = useState<ISearchInput[]>([]);
    const [ albums, setAlbums ] = useState<ISearchInput[]>([]);
    const [ songs, setSongs ] = useState<ISearchInput[]>([]);
    const [ formData, setFormData ] = useState<IAsset>({
        assetType: '',
        name: '',
    });
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ searchValue, setSearchValue ] = useState<string | number>('');

    const navigate = (path: string, payload: IAsset | null=null) => {
        if (payload && payload.songs) {
            setFormData({ ...payload});
            setMultiSelect([]);
        } else if (payload) {
            setFormData((prev) => ({ ...prev, ...payload }));
        }
        router.push(path);
    };

    const handleSearchNavigation = async (tag : string) => {
        setLoading(true);
        setFormData({
            assetType: '',
            name: '',
        });
        const response = await apiInstance.searchAsset(tag);
        if(response) setData(response);

        if (tag === 'song') await handleFillSelect('album');
        if (tag === 'album') await handleFillSelect('artist');
        if (tag === 'playlist') await handleFillSelect('song');
        setLoading(false);
        return response;
    };

    const handleFillSelect = async (tag : string) => {
        if (['artist', 'album', 'song'].includes(tag)) {
            const response = await apiInstance.searchAsset(tag);
            const newData = response.map((item : ISearchInput) => {
                return {
                    name: item.name,
                    '@key': item['@key'],
                }
            });
            tag === 'artist' && setArtists(newData);
            tag === 'song' && setSongs(newData);
            tag === 'album' && setAlbums(newData);
        }
    };

    const handleInitMenu = (new_menu : []) => {
        const newMenu = new_menu.map((item : any) => {
            return {
                label: item.label,
                tag: item.tag,
            };
        });
        setMenu(newMenu);
    };

    const preparePayload = (assetType: string) => {
        const assets: { [key in 'artist' | 'album' | 'song' | 'playlist']: any } = {
            artist: {
                name: formData.name,
                country: formData.country,
            },
            album: {
                name: formData.name,
                artist: formData.artist,
                year: formData.year,
            },
            song: {
                name: formData.name,
                album: formData.album,
            },
            playlist: {
                name: formData.name,
                private: formData.private,
                songs: formData.songs,
            }
        };
     
        return { 
            ...assets[assetType as 'artist' | 'album' | 'song' | 'playlist'],
            '@assetType': assetType,
        };
    }

    const handleCreateUpdateAsset = async (assetType : string, action : string='create') => {
        const payload: any = preparePayload(assetType);
        
        const assetTypeList = ['songs', 'artist', 'album'];
        assetTypeList.forEach((type) => {
            if (typeof payload[type] === 'string' || action === 'create') {
                if (type == "songs" && multiSelect.length > 0) {
                    payload[type] = multiSelect.map((item) => ({ '@assetType': item.id.split(':')[0], '@key': item.id }));
                } else if (type in payload && type !== 'songs') {
                    payload[type] = { '@assetType': String(payload[type]).split(':')[0], '@key': String(payload[type]) };
                } else delete payload[type];
            }
        });

        delete payload.assetType;

        const validate = isRequired(payload);

        if(!validate) return toast.warn('Todos os campos são obrigatórios!');

        setLoading(true);
        
        try {
            const res = action === 'update'
                ? await apiInstance.updateAsset(payload)
                : await apiInstance.createAsset(payload);

            if (!res) return toast.error(`Erro ao ${action === 'update' ? 'atualizar' : 'criar'} ${payload.name}!`);
            
            toast.success(`${payload.name} ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!`);
            setFormData({
                assetType: '',
                name: '',
            })
            await handleSearchNavigation(assetType);
            navigate(`/${assetType}`);
        } catch (error) {
            toast.error(`Erro ao ${action === 'update' ? 'atualizar' : 'criar'} ${payload.name}!`);
        } finally {
            setLoading(false)
        }
    };

    const handleDeleteAsset = async (item : any) => {
        setLoading(true);

        const payload : any = { 
            '@assetType': item['@assetType'],
            id: item['@key'],
            name: item.name
        };
        if (item['@assetType'] == 'song') payload.album = item.album;
        if (item['@assetType'] == 'album') payload.artist = item.artist;

        try {
            const res = await apiInstance.deleteAsset(payload);
           
            if (!res) return toast.error(`Não foi possível deletar o ${item['@assetType']}. O mesmo está vinculado a outro tipo!`);
         
            toast.success(`${item['@assetType']} deletado com sucesso!`);
            await handleSearchNavigation(item['@assetType']);
        } catch (error) {
            toast.error(`Erro ao deletar ${item['@assetType']}!`);
        } finally {
            setLoading(false);
        }
    };

    const changeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const changeMultiSelect = (item: { id: string, name: string }) => {
        setMultiSelect((prev) => {
            const exists = prev.some((prevItem) => prevItem.id === item.id);
            if (!exists) return [...prev, item];
            return prev.filter((prevItem) => prevItem.id !== item.id);
        });
    };

    const changeSearchValue = (value: string | number, keyPress: string='') => {
        setSearchValue(value);

        if (value === '') {
            const initialData = dataHistory[Object.keys(dataHistory)[0]];
            if (initialData) setData(initialData);
            return;
        }

        if (keyPress == 'Backspace' && dataHistory[value]) { 
            return setData(dataHistory[value]);
        } else if (!dataHistory[value]) {
            setDataHistory((prev) => {
                return {
                    ...prev,
                    [value]: data,
                };
            })
        }
       
        let filteredData : SetStateAction<IAsset[]> = [];

        if (typeof value === 'string') 
            filteredData = data.filter((item : IAsset) => item.name.toLowerCase().includes(value.toLowerCase()));
        
        if (typeof value === 'number')
            filteredData = data.filter((item : IAsset) => item.year == value.toString());
      
        setData(filteredData);
       
    };

    useEffect(() => {
        if (pathname == '/') redirect('/artist');

        const fetchMenuData = async () => {
          let schemas = await apiInstance.getSchema();
          schemas = schemas.filter((schema : any) => schema.tag !== 'assetTypeListData');
          handleInitMenu(schemas);
        };

        const fetchInitialData = async () => {
            let response;
            if(pathname !== '/'){
                const tag = pathname.split('/')[1];
                response = await handleSearchNavigation(tag);

                if (tag === 'song') await handleFillSelect('album');
                if (tag === 'album') await handleFillSelect('artist');
                if (tag === 'playlist') await handleFillSelect('song');
            };

            if(pathname.includes('edit')) {
                const param_id = window.location.search.split('id=')[1];
                if (!param_id) navigate(`/${pathname.split('/')[1]}`);
                const payload = response.find((item : any) => item['@key'].split(':')[1] === param_id);
                delete payload['@lastTouchBy'];
                delete payload['@lastTx'];
                delete payload['@key'];
                delete payload['@lastUpdated'];
                if (payload) navigate(pathname, payload);
            };
        };

        fetchMenuData();
        fetchInitialData();

    }, []);

    return (
        <GlobalContext.Provider value={{
            menu,
            handleInitMenu,
            handleSearchNavigation,
            data,
            handleCreateUpdateAsset,
            navigate,
            formData,
            changeFormData,
            artists,
            albums,
            songs,
            multiSelect,
            changeMultiSelect,
            handleDeleteAsset,
            loading,
            searchValue,
            changeSearchValue,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;