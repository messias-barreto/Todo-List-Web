import styles from './Work.module.css';

import imgStudy from '../assets/images/study.jpg';
import { ProgressBar } from 'react-bootstrap';

interface IProps {
    name: string;
    description: string;
    percent: number;
}

export function Work({ name, description, percent }: IProps) {
    return (
        <article className={styles.works}>

            <div className={styles.worksDescription}>
                <img className={styles.cover} src={imgStudy} />
                <strong>{name}</strong>
                <p>{description}</p>
            </div>

            <footer>
                <ProgressBar now={percent} label={`${percent}%`} />
            </footer>
        </article>
    )
}