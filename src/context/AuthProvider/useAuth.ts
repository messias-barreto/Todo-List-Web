import { AuthContext } from './index';
import { useContext } from "react"

export const userAuth = () => {
    const context = useContext(AuthContext)
    return context;
}