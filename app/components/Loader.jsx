"use client";

import { useContext } from "react";
import { GlobalContext } from "../context";

const Loader = () => {
    const { loading } = useContext(GlobalContext);

    return (
        <>
        {loading && (
            <div className="loading">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )}
        </>
    );
}

export default Loader;