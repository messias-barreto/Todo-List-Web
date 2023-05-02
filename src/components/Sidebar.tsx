import { ReactNode, useContext } from 'react';
import styles from './Sidebar.module.css';
import Profile from '../assets/images/profile.jpeg';
import Banner from '../assets/images/banner1.jpg';
import { AuthContext } from '../context/AuthProvider';

interface IProps {
    children?: ReactNode | ReactNode[]
}

export function Sidebar({children}: IProps) {
    const auth = useContext(AuthContext);
    
    return (
        <div className={styles.sidebar}>
            <aside>
                <img className={styles.cover} src={Banner}/>
                <div className={styles.profile}>
                    <img
                        className={styles.avatar}
                        src={Profile} />
                    <strong>{auth.name}</strong>
                    <span>{auth.login}</span>
                </div>
            </aside>
            
            { children }
        </div>
    )
}