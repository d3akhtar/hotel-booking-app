import React, { useContext, useEffect, useState } from "react";
import Toast from "../src/components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../src/api-client'

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage)=> void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false
    })

    const [toast,setToast] = useState<ToastMessage | undefined>();
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => setToast(toastMessage),
            isLoggedIn: !isError
        }}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)}/>)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}