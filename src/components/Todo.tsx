import { CheckCircle, Circle, Pen, Trash } from '@phosphor-icons/react';
import EmojiFaceOkay from '../assets/emojis/task-ok.svg';
import EmojiFaceWork from '../assets/emojis/task-working.svg';
import EmokiFaceInProgress from '../assets/emojis/task-in-progress.svg';

import styles from './Todo.module.css';
import { Modal } from 'react-bootstrap';
import { ReactNode, useState } from 'react';

interface IProps {
    id?: string;
    status?: string;
    name: string;
    children:  ReactNode | ReactNode[];
    onSubmit?: () => Promise<void>
}


export function TodoComponent({ id, status, name, children, onSubmit, ...props }: IProps) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <li className={`${status === 'Finalizado' ? styles.todoFinish :
                status === 'Em Andamento' ? styles.todoInProgress :
                    styles.todo}`
            } key={id}>
                <span>
                    {
                        status === 'Finalizado' ? <img src={EmojiFaceOkay} /> :
                            status === 'Em Andamento' ? <img src={EmokiFaceInProgress} /> :
                                <img src={EmojiFaceWork} />
                    }

                    {name}
                </span>

                <span>
                    {
                        status === 'Finalizado' ? <CheckCircle size={32} /> :
                        status === 'Em Andamento' ? <Circle size={32} 
                                                            className={styles.button}
                                                            onClick={onSubmit} /> : ''
                    }

                    <Pen onClick={handleShow} size={32} className={styles.button} />
                    <Trash size={32} className={styles.button} {...props} />
                </span>
            </li>

            <Modal show={show} onHide={handleClose}>
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