import styles from './Work.module.css';

import imgStudy from '../assets/images/study.jpg';

interface IProps {
    name: string;
    description: string;
}

export function Work({name, description}: IProps) {
    return (
        <article className={styles.works}>
            <img className={styles.cover} src={imgStudy} />

            <div className={styles.worksDescription}>
                <strong>{name}</strong>
                <p>{description}</p>
            </div>

            <footer>
                <progress value="30" max="100" className={styles.progress}><p>70 %</p></progress>
            </footer>
        </article>
    )
}