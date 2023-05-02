import { House, ListChecks, SignOut, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export function Menu() {
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
                <li><SignOut size={18} className={styles.icon} />Sair</li>
            </ul>
        </article>
    )
}