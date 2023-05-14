import React, { ChangeEvent, useContext, useState } from "react";
import { Accordion, Button, Form, Spinner } from "react-bootstrap";
import { InputComponent } from "../../components/forms/InputComponent";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { Message } from "../../components/Message";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthProvider";
import { setUserLocalStorage } from "../../context/AuthProvider/util";
import { updatePassword, updateProfile } from "../../data/services/user";

import styles from "./Profile.module.css";

export function Profile() {
    const auth = useContext(AuthContext);

    const [name, setName] = useState<string>(`${auth.name}`);
    const [login, setLogin] = useState<string>(`${auth.login}`);
    const [email, setEmail] = useState<string>(`${auth.email}`);

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [variant, setVariant] = useState<string>('');

    const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
    const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

    const [showPasswordMessage, setShowPasswordMessage] = useState<boolean>(false);

    const onChangeName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setName(event.target.value)
    }

    const onChangeLogin = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setLogin(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const onChangeCurrentPassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentPassword(event.target.value)
    }

    const onChangeNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPassword(event.target.value)
    }

    const onChangeConfirmNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConfirmNewPassword(event.target.value)
    }

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingProfile(true);

        const res = await updateProfile({ name, login, email });
        if (res.status !== 200) {
            setMessage(res.data.message);
            setVariant('danger');
            setShow(true);

            setLoadingProfile(false);
            return false;
        }

        setMessage(res.data.message);
        setVariant('success');
        setShow(true);
        setLoadingProfile(false);

        const user = { name, login, email };
        await setUserLocalStorage(user);
    }

    const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingPassword(true);

        if (newPassword !== confirmNewPassword) {
            setMessage('Senhas Informadas são Diferentes!');
            setVariant('warning');
            setShowPasswordMessage(true);
            setLoadingPassword(false);

            return false;
        }

        const res = await updatePassword(currentPassword, newPassword);
        if (res.status !== 200) {
            setMessage(res.data.message);
            setVariant('danger');
            setShowPasswordMessage(true);
            setLoadingPassword(false);

            return false;
        }

        setMessage(res.data.message);
        setVariant('success');
        setShowPasswordMessage(true);
        setLoadingPassword(false);

        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <div>
                    <Sidebar />
                </div>

                <main>
                    <Menu />
                    <Message message={message}
                        variant={variant}
                        show={show}
                        onClose={() => setShow(false)}
                        dismissible />

                    <Form onSubmit={handleUpdateProfile}>
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

                        <Button className={styles.btnCreateAccount} type="submit" variant='primary'>
                            {
                                loadingProfile === true && (
                                    <Spinner as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        className={styles.Spinner}
                                        aria-hidden="true" />
                                )
                            }
                            <span>Atualizar</span>
                        </Button>
                    </Form>

                    <Accordion className={styles.accordion}>
                        <Message message={message}
                            variant={variant}
                            show={showPasswordMessage}
                            onClose={() => setShowPasswordMessage(false)}
                            dismissible />

                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Atualizar Senha</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleUpdatePassword}>
                                    <InputComponent
                                        id={currentPassword}
                                        name={currentPassword}
                                        type="password"
                                        value={currentPassword}
                                        placeholder={'Digite Sua Senha Atual!'}
                                        onChange={onChangeCurrentPassword} />

                                    <InputComponent
                                        id={newPassword}
                                        name={newPassword}
                                        type="password"
                                        value={newPassword}
                                        placeholder={'Digite Sua Nova Senha!'}
                                        onChange={onChangeNewPassword} />

                                    <InputComponent
                                        id={'confirm' + confirmNewPassword}
                                        name={confirmNewPassword}
                                        type="password"
                                        value={confirmNewPassword}
                                        placeholder={'Confirme Sua Nova Senha!'}
                                        onChange={onChangeConfirmNewPassword} />

                                    <Button className={styles.btnCreateAccount} type="submit" variant='primary'>
                                        {
                                            loadingPassword === true && (
                                                <Spinner as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    className={styles.Spinner}
                                                    aria-hidden="true" />
                                            )
                                        }
                                        <span>Atualizar</span>
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </main>
            </div>
        </div>
    );
}