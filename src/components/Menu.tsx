import { House, KeyReturn, ListChecks, SignOut, User } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import styles from "./Menu.module.css";
import { ModalBody } from "./modal/ModalBody";
import { ModalComponent } from "./modal/ModalComponent";
import { ModalHeader } from "./modal/ModalHeader";


export function Menu() {
    const [show, setShow] = useState<boolean>(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function onHandleLogout() {
        auth.logout();
        navigate('/login');
    }
    
    return (
        <article className={styles.menu}>
            <ul>
                <li>
                    <Link to={'/dashboard'}>
                            <House size={18} className={styles.icon} /> Home
                    </Link>
                </li>
                <li>
                    <Link to={'/projects'}>
                        <ListChecks size={18} className={styles.icon} /> Projetos
                    </Link>
                </li>
                <li><User size={18} className={styles.icon} /> Perfil</li>
                <li onClick={() => setShow(true)}><SignOut size={18} className={styles.icon} />Sair</li>
            </ul>


            <ModalComponent show={show} handleClose={() => setShow(false)}>
                <ModalHeader title="Sair do Sistema!" />
                <ModalBody>
                        <article className={styles.confirm}>
                            <strong>Tem Certeza que Deseja Sair?</strong>
                            <div className={styles.btnConfirm}>
                                <Button variant="primary" onClick={() => setShow(false)}><KeyReturn size={32} />Retornar</Button>
                                <Button variant="danger" onClick={onHandleLogout}><SignOut size={32} />Sair</Button>
                            </div>
                        </article>
                </ModalBody>
            </ModalComponent>
        </article>
    )
}