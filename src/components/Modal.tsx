import { Icon, IconProps } from "@phosphor-icons/react";
import { ForwardRefExoticComponent, ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from './Modal.module.css';

interface IProps extends ForwardRefExoticComponent<IconProps> {
    title: string;
    children: ReactNode | ReactNode[];
    show: boolean;
    handleClose: () => void;
    icon?: Icon;
}

export function ModalMessageComponent({ title, children, show, handleClose }: IProps) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className={styles.headerModal}>
                    <Modal.Title className={styles.headerTitle}>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}