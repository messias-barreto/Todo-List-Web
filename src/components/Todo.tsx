import { CheckCircle, Circle, Trash } from '@phosphor-icons/react';
import EmojiFaceOkay from '../assets/emojis/task-ok.svg';
import EmojiFaceWork from '../assets/emojis/task-working.svg';
import styles from './Todo.module.css';

interface IProps {
    id?: string;
    status?: string;
    name: string;
}

export function TodoComponent({ id, status, name }: IProps) {
    return (
        <li className={`${status === 'Finalizado' ?
            styles.todoFinish :
            styles.todo}`
        } key={id}>
            <span>
                {
                    status === 'Finalizado'
                        ? <img src={EmojiFaceOkay} />
                        : <img src={EmojiFaceWork} />
                }

                {name}
            </span>
            <span>
                {
                    status === 'Finalizado' ? <CheckCircle size={32} /> : <Circle size={32} className={styles.button} />
                }
                
                <Trash size={32} className={styles.button} />
            </span>
        </li>
    )
}