import { ChangeEvent, ReactNode } from "react";
import { Form, FormGroup } from "react-bootstrap";
import styles from './Input.module.css';

interface IProps {
    label?: string;
    value: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    children: ReactNode | ReactNode[] | [];
}

export function SelectComponent({ label, children, value, onChange }: IProps) {
    return (
        <FormGroup className={styles.FormGroup}>
            <Form.Label htmlFor="disabledTextInput" className={styles.label}>{label}</Form.Label>
            <Form.Select aria-label={label} className={styles.select}
                                            value={value} 
                                            onChange={onChange}>
                {children}
            </Form.Select>
        </FormGroup>
    );
}