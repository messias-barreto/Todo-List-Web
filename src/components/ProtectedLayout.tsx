import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { userAuth } from "../context/AuthProvider/useAuth";
import { Login } from "../pages/Login";
import styles from './ProtectedLayout.module.css'

export function ProtectedLayout({ children }: {children: JSX.Element}){
    const auth = userAuth();
    const [valida, setValida] = useState(false);

    setTimeout(() => { 
        setValida(true)
     }, 3000);

    return  valida === false ? <div className={styles.waitPage}><Spinner className={styles.spinner} animation="grow" /></div> : 
            !auth.login ? <Login /> : children 
}