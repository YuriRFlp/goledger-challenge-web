"use client";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icons } from "./Icons";

const Menu = () => {
    const { menu, handleSearchNavigation } = useContext(GlobalContext);
    const pathname = usePathname();

    const icon = {
        song: <Icons.song />,
        artist: <Icons.artist />,
        playlist: <Icons.playlist />,
        album: <Icons.album />,
    }

    return (
        <>
            <Image src="/ledgerfy_logo.png" alt="logo" width={170} height={170} className="mx-auto" style={{ width: "auto", height: "auto" }} />
            <nav className="mt-0 md:mt-10">
                <ul className="flex items-center justify-between md:block">
                    {menu.map(({ label, tag } : { label: string; tag: keyof typeof icon }) => (
                        <li
                            key={tag}
                            className={`cursor-pointer my-4 hover:text-green ${pathname.split('/')[1] === tag && 'text-green'}`}
                            onClick={() => handleSearchNavigation(tag)}
                        >
                            <Link href={`/${tag}`} className="block py-3">
                                <span className="flex items-center">
                                    {window.innerWidth > 500 && icon[tag]}
                                    <span className="ml-4">{label}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Menu;