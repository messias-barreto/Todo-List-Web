import React, {createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUSer } from "./types";
import { getTokenLocalStorage, getUserLocalStorage, LoginRequest, setTokenLocalStorage, setUserLocalStorage, validateToken } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUSer | null>();
    
    useEffect(() => {
        const validate = async () => {
            const token = await getTokenLocalStorage();
            if(token) {
                const refresh_token = await validateToken(token);
                   
                if(refresh_token) {
                    const user = await getUserLocalStorage();
                    setUser(user);
                    setTokenLocalStorage(refresh_token);
                }
            }else {
                setUser(null);
                await setUserLocalStorage(null);
                await setTokenLocalStorage(null);
            }
        }

        validate();
    }, [])

    async function authenticate (login: string, password: string) {
        const response = await LoginRequest(login, password);
        
        const payload = {   name: response.user.name,
                            login, 
                            email: response.user.email }
        setUser(payload);
        await setUserLocalStorage(payload);
        await setTokenLocalStorage(response.refresh_token);
    }

    function logout () {
        setUser(null);
        setUserLocalStorage(null);
        setTokenLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}