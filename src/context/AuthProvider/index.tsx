import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUSer } from "./types";
import { getRefreshTokenLocalStorage, getTokenLocalStorage, getUserLocalStorage, LoginRequest, setRefreshTokenLocalStorage, setTokenLocalStorage, setUserLocalStorage, validateToken } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUSer | null>();

    useEffect(() => {
        const validate = async () => {
            const token = await getTokenLocalStorage();
            const refreshToken = await getRefreshTokenLocalStorage();

            let response = await validateToken(token);

            if (response === null) {
                response = await validateToken(refreshToken);
            }

            //validar com o refreshToken
            if (response === null) {
                setUser(null);
                return false;
            }

            const user = await getUserLocalStorage();
            setUser(user);
            await setTokenLocalStorage(response.token);
            await setRefreshTokenLocalStorage(response.refresh_token);
        }

        validate();
    }, [])

    async function authenticate(login: string, password: string) {
        const response = await LoginRequest(login, password);

        const payload = {
            name: response.user.name,
            login,
            email: response.user.email
        }

        setUser(payload);
        await setUserLocalStorage(payload);
        await setTokenLocalStorage(response.token);
        await setRefreshTokenLocalStorage(response.refresh_token);
    }

    async function logout() {
        setUser(null);
        await setUserLocalStorage(null);
        await setTokenLocalStorage(null);
        await setRefreshTokenLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}