import { ReactNode } from 'react';
import { Filter } from './Filter';
import styles from './Sidebar.module.css';

interface IProps {
    children?: ReactNode | ReactNode[]
}

export function Sidebar({children}: IProps) {
    return (
        <div className={styles.sidebar}>
            <aside>
                <img
                    className={styles.cover}
                    src='https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50' />

                <div className={styles.profile}>
                    <img
                        className={styles.avatar}
                        src='https://avatars.githubusercontent.com/u/60475024?v=4' />
                    <strong>Messias Barreto</strong>
                    <span>messias.barreto</span>
                </div>

                <footer>
                    <a href='#'>Editar seu Perfil</a>
                </footer>
            </aside>
            
            { children }
        </div>
    )
}