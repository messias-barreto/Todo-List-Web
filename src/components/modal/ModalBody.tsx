import { ReactNode } from "react"
import { Modal } from "react-bootstrap";
import styles from './Modal.module.css';

interface Iprops {
    children: ReactNode | ReactNode[]
}

export function ModalBody({ children }: Iprops, {...props}) {
    return (
        <Modal.Body className={styles.bodyModal} {...props}>{children} </Modal.Body>
    )
}