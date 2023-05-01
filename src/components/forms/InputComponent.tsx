import { ChangeEvent } from "react";
import { Form, FormGroup } from "react-bootstrap";
import styles from './Input.module.css';

interface IProps {
    id: string;
    label?: string;
    name: string;
    type: string;
    value?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
export function InputComponent({ id, label, name, type, value, placeholder, onChange }: IProps) {
    return (
        <FormGroup className={styles.FormGroup}>
            <Form.Label htmlFor="disabledTextInput" className={styles.label}>{label}</Form.Label>
            <Form.Control className={styles.formControl} 
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={true} />
        </FormGroup>
    )
}