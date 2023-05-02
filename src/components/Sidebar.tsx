import { ReactNode } from 'react';
import { Filter } from './Filter';
import styles from './Sidebar.module.css';
import Profile from '../assets/images/profile.jpeg';
import Banner from '../assets/images/banner1.jpg';

interface IProps {
    children?: ReactNode | ReactNode[]
}

export function Sidebar({children}: IProps) {
    return (
        <div className={styles.sidebar}>
            <aside>
                <img className={styles.cover} src={Banner}/>
                <div className={styles.profile}>
                    <img
                        className={styles.avatar}
                        src={Profile} />
                    <strong>Messias Barreto</strong>
                    <span>messias.barreto</span>
                </div>
            </aside>
            
            { children }
        </div>
    )
}