import { CheckFat, Warning, XCircle } from "@phosphor-icons/react";
import { warning } from "@remix-run/router/dist/history";
import { Alert } from "react-bootstrap";
import styles from "./Message.module.css";

interface IProps {
    message: string;
    variant: string;
}

export function Message({ message, variant, ...props }: IProps) {
    return <Alert variant={variant} {...props} className={styles.alert}>
        {
            variant === 'success' ? <CheckFat size={30} className={styles.icon} /> :
            variant === 'warning' ? <Warning size={30}  className={styles.icon} /> :
                                    <XCircle size={30} />
        }
         
        <p>{ message }</p>
    </Alert>
}