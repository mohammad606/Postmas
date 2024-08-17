"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {createContext, Dispatch, SetStateAction, useState} from "react";

export interface ObjectPost {
    group:number,
    api:number
}

interface ReFetchPhotoContextType {
    postArray: ObjectPost[];
    setPostArray: Dispatch<SetStateAction<ObjectPost[]>>;
}
const defaultReFetchPhotoValue: ReFetchPhotoContextType = {
    postArray: [],
    setPostArray: () => {},
};
export const ReFetchPostApi = createContext(defaultReFetchPhotoValue);
const Providers = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(new QueryClient())
    const [postArray,setPostArray] = useState<ObjectPost[]>([])
    return (
        <ReFetchPostApi.Provider value={{postArray,setPostArray}}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </ReFetchPostApi.Provider>

    );
};
export default Providers;