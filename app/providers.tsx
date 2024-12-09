import { ToastContainer } from "react-toastify";
import GlobalProvider from "./context";
import Loader from "@/app/components/Loader";

export const Providers = ({ children } : Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <GlobalProvider>
            { children }
            <ToastContainer />
            <Loader />
        </GlobalProvider>
    );
}