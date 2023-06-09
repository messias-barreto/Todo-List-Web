import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import BannerLogin from "../../assets/images/banner-login.jpg";
import { SignIn } from "@phosphor-icons/react";
import { Message } from "../../components/Message";

export function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [variant, setVariant] = useState<string>('');

    const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        await auth.authenticate(login, password).then(() => navigate("/dashboard"))
                                                .catch(() => {
                                                    setMessage('Login ou Senha Incorreta(s)!');
                                                    setVariant('danger');
                                                    setShow(true);
                                                    setLoading(false)
                                                })
    }

    return (
        <div className={styles.wrapper}>
            <Col md={6} className={styles.loginForm}>
                <h3 className={styles.title}> Todo List </h3> 
            
                <Form onSubmit={handleLogin}>
                   <Message message={message} variant={variant} show={show} onClose={() => setShow(false)} dismissible />
                    
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Login</strong></Form.Label>
                        <Form.Control type="text"
                            placeholder="Digite seu Login"
                            value={login}
                            onChange={onChangeLogin}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Senha</strong></Form.Label>
                        <Form.Control type="password"
                            placeholder="Digite sua Senha"
                            value={password}
                            onChange={onChangePassword}
                            required />
                    </Form.Group>

                    <Button variant="primary"
                        type="submit"
                        className={styles.button}>
                            { 
                                loading === true ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                                                 : <SignIn size={20} className={styles.iconBtnLogin} />
                            }
                        
                        Logar
                    </Button>
                </Form>

                <hr />
                <p className={styles.register}>Não tem Cadastro | <Link to="/create-account"><strong>Clique AQUI!</strong></Link></p>
            </Col>

            <Col md={6}>
                <Image src={BannerLogin} fluid={true} className={styles.image} />
            </Col>
        </div>
    )
}