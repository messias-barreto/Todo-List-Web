import { ReactNode } from 'react';
import styles from './Filter.module.css';

interface IProps {
    title: string;
    children: JSX.Element | JSX.Element[]
    onSubmit?: () => Promise<void>
  }
  
export function Filter({title, children}: IProps) {
    return (
        <aside className={styles.filter}>
            <h2>{title}</h2>
            <ul>
                { children }
            </ul>
        </aside>
    )
}