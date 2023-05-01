export interface IUSer {
    login?: string;
    token?: string; 
}

export interface IContext extends IUSer {
    authenticate: (login: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element
}