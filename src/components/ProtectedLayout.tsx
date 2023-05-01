import { userAuth } from "../context/AuthProvider/useAuth";
import { Login } from "../pages/Login";


export function ProtectedLayout({ children }: {children: JSX.Element}){
    const auth = userAuth();

    if(!auth.login) {
        return <Login />
    }

    return children;
}