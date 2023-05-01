import { Modal } from "react-bootstrap";
import styles from './Modal.module.css';

interface Iprops {
    title: string
}
export function ModalHeader({title}: Iprops, {...props}) {
    return (
        <Modal.Header className={styles.headerModal} closeButton {...props}>
            { title }
        </Modal.Header>
    )
}