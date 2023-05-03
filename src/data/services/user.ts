import { API } from "./api";

interface IUser {
    id?: string;
    name: string;
    login: string;
    email: string;
    password: string;
}

export async function createUser({name, login, email, password}: IUser) {
    const user = { name, login, email, password };

    const data = await API.post("/users/", user).then(res => { return res })
                                                .catch((err) => { return err });
    
                                                return data;
}