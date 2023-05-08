import { ReactNode } from 'react';
import styles from './Filter.module.css';

interface IProps {
    title: string;
    children: JSX.Element | JSX.Element[];
    onSubmit?: () => Promise<void>;
    qtdItens?: number;
}

export function Filter({ title, children, qtdItens, ...props }: IProps) {
    return (
        <aside className={styles.filter}>
            <h2>{title}</h2>
            <ul>
                <li key={'all'}>
                    <p>
                        <input {...props} />
                        Todos
                    </p>

                    <strong>{qtdItens}</strong>
                </li>


                {children}
            </ul>
        </aside>
    )
}