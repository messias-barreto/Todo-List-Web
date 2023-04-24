import { CheckCircle, Circle, Pen, Trash } from '@phosphor-icons/react';
import EmojiFaceOkay from '../assets/emojis/task-ok.svg';
import EmojiFaceWork from '../assets/emojis/task-working.svg';
import EmokiFaceInProgress from '../assets/emojis/task-in-progress.svg';
import styles from './Todo.module.css';
import { Modal } from 'react-bootstrap';
import { ReactNode, useEffect, useState } from 'react';
import { SelectComponent } from './forms/SelectComponent';
import { getAllStatus } from '../data/services/todo';


interface IStatusTodo {
    id: string;
    name: string;
}

interface IProps {
    id?: string;
    status?: string;
    name: string;
    children:  ReactNode | ReactNode[]
}


export function TodoComponent({ id, status, name, children }: IProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <li className={`${status === 'Finalizado' ? styles.todoFinish :
                status === 'Em Progresso' ? styles.todoInProgress :
                    styles.todo}`
            } key={id}>
                <span>
                    {
                        status === 'Finalizado' ? <img src={EmojiFaceOkay} /> :
                            status === 'Em Progresso' ? <img src={EmokiFaceInProgress} /> :
                                <img src={EmojiFaceWork} />
                    }

                    {name}
                </span>

                <span>
                    {
                        status === 'Finalizado' ? <CheckCircle size={32} /> :
                            status === 'Em Progresso' ? <Circle size={32} className={styles.button} /> : ''
                    }

                    <Pen onClick={handleShow} size={32} className={styles.button} />
                    <Trash size={32} className={styles.button} />
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