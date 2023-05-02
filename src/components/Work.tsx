import styles from './Work.module.css';

import imgStudy from '../assets/images/banner1.jpg';
import { ProgressBar } from 'react-bootstrap';
import { Pencil, Trash } from '@phosphor-icons/react';

interface IProps {
    name: string;
    description: string;
    percent: number;
}

export function Work({ name, description, percent }: IProps) {
    return (
        <>
            <article className={styles.works}>
                <div className={styles.worksHeader}>
                    <strong>{name}</strong>
                    <hr />
                </div>

                <div className={styles.worksDescription}>
                    <p>{description}</p>
                </div>

                <footer>
                    <ProgressBar now={percent} label={`${typeof percent === 'number' ? percent.toFixed(1) : 0}%`} />
                </footer>
            </article>
           
        </>
    )
}