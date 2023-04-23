import { Form, FormGroup } from "react-bootstrap";
import styles from './Input.module.css';

interface IProps {
    id: string;
    label?: string;
    name: string;
    value?: string;
    onChange?: () => void;
}
export function TextAreaComponent({ id, label, name, value, onChange }: IProps) {
    return (
        <FormGroup className={styles.FormGroup}>
            <Form.Label htmlFor="disabledTextInput" className={styles.label}>{label}</Form.Label>
            <Form.Control className={styles.formControlTextArea}
                as={'textarea'}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={false}/>
        </FormGroup>
    )
}