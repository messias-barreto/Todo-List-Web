import { CheckFat, Warning, XCircle } from "@phosphor-icons/react";
import { Alert } from "react-bootstrap";
import styles from "./Message.module.css";

interface IProps {
    message: string;
    variant: string;
    show: boolean;
    onClose?: () => void;
    dismissible?: boolean
}

export function Message({ message, variant, show, onClose }: IProps) {
    return  <Alert  variant={variant}
                    show = {show}
                    onClose={onClose}
                    className={styles.alert}
                    dismissible>
        {
            variant === 'success' ? <CheckFat size={30} className={styles.icon} /> :
            variant === 'warning' ? <Warning size={30}  className={styles.icon} /> :
                                    <XCircle size={30} />
        }
         
        <p>{ message }</p>
    </Alert>
}