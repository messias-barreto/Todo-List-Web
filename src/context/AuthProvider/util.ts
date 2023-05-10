import { IUSer } from './types';
import { API } from "../../data/services/api";

export async function setUserLocalStorage (user: IUSer | null) {
    localStorage.setItem('user', JSON.stringify(user));
}

export async function getUserLocalStorage () {
    const json = localStorage.getItem('user');
    if(!json) { return null; }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function setTokenLocalStorage (token: string | null) {
    localStorage.setItem('auth-token', JSON.stringify(token));
}

export async function getTokenLocalStorage () {
    const token = localStorage.getItem('auth-token');
    if(!token) { return null; }
    
    return token ?? null;
}

export async function setRefreshTokenLocalStorage (token: string | null) {
    localStorage.setItem('auth-refresh-token', JSON.stringify(token));
}

export async function getRefreshTokenLocalStorage () {
    const token = localStorage.getItem('auth-refresh-token');
    if(!token) { return null; }
    
    return token ?? null;
}


export async function validateToken (token: string | null) {
    const refresh = token?.replaceAll('"', '');

    const response = await API.post('/refresh-token', { token: refresh })
    .then(res => { 
        return res.data 
    
    })
    .catch(() => { 
        return null 
    })
    
    return response;
}

export async function LoginRequest (login: string, password: string) {
    try {
        const request = await API.post('sessions', {login, password})
        return request.data;
    } catch(err) {
        return null;
    }
}