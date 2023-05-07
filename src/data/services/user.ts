import { API } from "./api";

interface IUser {
    id?: string;
    name: string;
    login: string;
    email: string;
    password?: string;
}

export async function createUser({ name, login, email, password }: IUser) {
    const user = { name, login, email, password };

    const data = await API.post("/users/", user).then(res => {
        return {
            data: res.data,
            status: 201
        }

    }).catch((err) => {
        return {
            data: err.response.data,
            status: err.response.status
        }
    });

    return data;
}

export async function updateProfile({ name, login, email }: IUser) {
    const user = { name, login, email };

    const data = await API.patch("/users/profile", user).then(res => {
        return {
            data: res.data,
            status: res.status
        }

    }).catch((err) => {
        return {
            data: err.response.data,
            status: err.response.status
        }
    });

    return data;
}

export async function updatePassword(currentPassword: string, newPassword: string) {
    const data = await API.patch("/users/password", { currentPassword, newPassword }).then(res => {
        return {
            data: res.data,
            status: res.status
        }

    }).catch((err) => {
        return {
            data: err.response.data,
            status: err.response.status
        }
    });

    return data;
}