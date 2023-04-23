import styles from './Header.module.css';
import Logo from '../assets/images/logo.png';

export function Header () {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={Logo} />
            <strong>Todo List</strong>
        </header>
    )
}