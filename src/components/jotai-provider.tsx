"use client"

import { Provider } from "jotai";

interface JaotaiProviderProps {
    children: React.ReactNode;
}

export const JaotaiProvider = ({children}: JaotaiProviderProps) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}