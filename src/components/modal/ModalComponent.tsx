import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

interface IProps {
    show: boolean;
    handleClose: () => void;
    children: ReactNode[] | ReactNode
}
export function ModalComponent({show, handleClose, children}: IProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            { children }
        </Modal>
    )
}