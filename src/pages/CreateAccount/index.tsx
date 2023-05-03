import { SignIn } from '@phosphor-icons/react';
import { ChangeEvent, useContext, useState } from 'react';
import { Button, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../components/Message';
import { AuthContext } from '../../context/AuthProvider';
import styles from './CreateAccount.module.css';

import BannerCreateAccount from '../../assets/images/banner-create-account.jpg';
import { InputComponent } from '../../components/forms/InputComponent';
import { createUser } from '../../data/services/user';

export function CreateAccount() {
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [variant, setVariant] = useState<string>('');

    const onChangeName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setName(event.target.value)
    }

    const onChangeLogin = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setLogin(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(event.target.value)
    }

    const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        await createUser({ name, login, email, password })
                                                .then(() => {
                                                    auth.authenticate(login, password)
                                                        .then(() => navigate("/dashboard"))
                                                        .catch(() => {
                                                            setMessage('Erro na Autenticação!');
                                                            setVariant('danger');
                                                            setShow(true);
                                                        });
                                                })
                                                .catch((err) => {
                                                    setMessage(err.message);
                                                    setVariant('danger');
                                                    setShow(true);
                                                })
    }

    return (
        <div className={styles.wrapper}>
            <Col md={5} className={styles.loginForm}>
                <h3 className={styles.title}>Todo List</h3>
                <strong>Criando a sua Conta</strong>

                <Form onSubmit={handleCreateAccount}>
                    <InputComponent 
                                    id={name} 
                                    name={name} 
                                    type="text" 
                                    value={name}
                                    placeholder={'Digite Seu Nome!'}
                                    onChange={onChangeName} />

                    <InputComponent 
                                    id={login} 
                                    name={login} 
                                    type="text" 
                                    value={login}
                                    placeholder={'Digite Seu Login!'}
                                    onChange={onChangeLogin} />
                    
                    <InputComponent 
                                    id={email} 
                                    name={email} 
                                    type="email" 
                                    value={email}
                                    placeholder={'Digite Seu Email!'}
                                    onChange={onChangeEmail} />

                    <InputComponent 
                                    id={password} 
                                    name={password} 
                                    type="password" 
                                    value={password}
                                    placeholder={'Digite Sua Senha!'}
                                    onChange={onChangePassword} />
                    
                    <Button className={styles.btnCreateAccount} type="submit" variant='primary'>Cadastrar</Button>
                </Form>

                <hr />
                <p className={styles.register}>Já tem uma Conta | <strong>Clique AQUI!</strong></p>
            </Col>

            <Col md={6}>
                <Image src={BannerCreateAccount} fluid={true} className={styles.image} />
            </Col>
        </div>
    )
}