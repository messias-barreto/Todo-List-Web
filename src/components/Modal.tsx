import { Icon, IconProps } from "@phosphor-icons/react";
import { ForwardRefExoticComponent, ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from './Modal.module.css';

interface IProps extends ForwardRefExoticComponent<IconProps>{
    title: string;
    children: ReactNode | ReactNode[];
    showModal: boolean;
    icon: Icon;
}

export function ModalComponent({ title, children, showModal, icon }: IProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {icon}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton className={styles.headerModal}>
                    <Modal.Title className={styles.headerTitle}>Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}