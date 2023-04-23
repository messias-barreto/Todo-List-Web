import { Form } from "react-bootstrap";

export function Label(title: string) {
    return(
        <Form.Label htmlFor="disabledTextInput">{title}</Form.Label>
    )
}