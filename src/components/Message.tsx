import { Alert } from "react-bootstrap";

interface IProps {
    message: string;
    variant: string;
}

export function Message({ message, variant, ...props }: IProps) {
    return <Alert variant={variant} {...props}>
        {message}
    </Alert>
}