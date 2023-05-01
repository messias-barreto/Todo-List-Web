import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Add } from "../components/Add";
import { Filter } from "../components/Filter";
import { InputComponent } from "../components/forms/InputComponent";
import { TextAreaComponent } from "../components/forms/TextArea";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { addTodo, deleteTodo, getAllStatus, getTodosByProject, updateStatusTodo } from "../data/services/todo";
import { useNavigate } from "react-router-dom";

import Logo from '../assets/images/logo.png';
import styles from './Todo.module.css';

import { TodoComponent } from "../components/Todo";
import { useParams } from "react-router-dom";
import { KeyReturn, PlusCircle } from "@phosphor-icons/react";
import { Alert, Button, Form } from "react-bootstrap";
import { getProjectByid } from "../data/services/projects";
import { ModalMessageComponent } from "../components/Modal";
import { ModalComponent } from "../components/modal/ModalComponent";
import { ModalHeader } from "../components/modal/ModalHeader";
import { ModalBody } from "../components/modal/ModalBody";

interface ITodo {
    id: string;
    title: string;
    description: string;
    status: string;
}

interface IStatusTodo {
    id: string;
    name: string;
}

interface IProject {
    name: string;
    description: string;
}

export function Todo() {
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [filterTodo, setFilterTodo] = useState<ITodo[]>([]);
    const [statusTodo, setStatusTodo] = useState<IStatusTodo[]>([]);
    const [information, setInformation] = useState<string>('');

    const [title, setTitle] = useState<string>('');
    const [description, setDesctiption] = useState<string>('');
    const [todoId, setTodoId] = useState<string>('');

    const [project, setProject] = useState<IProject>();
    const { project_id } = useParams();
    const navigate = useNavigate();

    //Add
    const [showMessageAdd, setShowMessageAdd] = useState(false);

    const handleMessageAddShow = () => setShowMessageAdd(true);
    const handleMessageAddClose = () => {
        setShowMessageAdd(false);
        setMessage('');
    }

    //Remove Tarefa
    const [showRemoveTodo, setShowRemoveTodo] = useState(false);
    const handleShowModalRemoveAdd = (id: string) => {
        setTodoId(id);
        setShowRemoveTodo(true);
    }

    const handleShowModalRemoveClose = () => {
        setShowRemoveTodo(false);
        setMessage('');
    }

    //Mensagens 
    const [message, setMessage] = useState<string>('');
    const [variant, setVariant] = useState<string>('');

    const handleClose = () => {
        setMessage('');
    };

    async function handleTodo() {
        const id = project_id !== undefined ? project_id : '';
        await getTodosByProject(id).then(res => {
            setTodo(res)
            setFilterTodo(res)
        }).catch((error) => { console.error(error) })
    }

    async function handleAllStatusTodo() {
        await getAllStatus().then(res => setStatusTodo(res));
    }

    async function handleGetProject() {
        const id = project_id !== undefined ? project_id : '';
        await getProjectByid(id).then(res => setProject(res));
    }

    async function onSubmitTodo(event: FormEvent) {
        event?.preventDefault();

        const id = project_id !== undefined ? project_id : '';
        let status: string = 'error';

        const find_status = statusTodo.find((stat: IStatusTodo) => stat.name === 'Em Aguardo');
        if (find_status !== undefined) {
            status = find_status.id;
        }

        await addTodo({ title, description, project_id: id, status })
            .then(() => {
                setMessage('Tarefa foi Adicionada!')
                setVariant('success')
                setTitle('')
                setDesctiption('')
            })
            .catch(err => {
                setMessage(err.response.data.message)
                setVariant('danger')
            });

        await handleTodo()
    }

    async function handleRemoveTodo(event: FormEvent) {
        event?.preventDefault()
        const data = await deleteTodo(todoId);

        await handleTodo();
        setMessage(data.message);
        setVariant('success')
    }

    const onSubmitUpdateStatusTodo = async (id: string | undefined, statusName: string) => {
        event?.preventDefault()
        let status = 'error';

        const find_status = statusTodo.find((stat: IStatusTodo) => stat.name === statusName);
        if (find_status !== undefined) {
            status = find_status.id;
        }

        await updateStatusTodo(status, id)
        await handleTodo();
    }

    function handleChangeTitle(event: ChangeEvent<HTMLTextAreaElement>) {
        setTitle(event.target.value);
    }

    function handleChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        setDesctiption(event.target.value);
    }

    async function handleCountTask() {
        const allTodo = todo.length;
        const status = todo.filter(st => st.status === 'Finalizado');

        if (status !== undefined) {
            setInformation(`Tarefas: ${allTodo} | ${status.length}`);
        }
    }

    function handleSearchTodoByStatus(event: ChangeEvent<HTMLTextAreaElement>): void {
        const category = todo.filter((todo: ITodo) => todo.status === event.target.value);
        setFilterTodo(category);
    }

    function getValueCategoryTodo(status: string): number {
        const filter = todo.filter((todo: ITodo) => todo.status === status)
        return filter.length;
    }

    useEffect(() => {
        handleTodo()
        handleAllStatusTodo()
        handleGetProject()
    }, [])

    useEffect(() => {
        handleCountTask()
    }, [todo])

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <div>
                    <Sidebar>
                        <Filter title="Listagem por Status">
                            {
                                statusTodo.map(status =>
                                    <li key={status.id}>
                                        <p>
                                            <input
                                                className={styles.checkFilter}
                                                type="radio"
                                                id={"radioListCategories"}
                                                name={"radioListCategories"}
                                                value={status.name}
                                                onClick={handleSearchTodoByStatus} />
                                            {status.name}
                                        </p>
                                        <strong> {getValueCategoryTodo(status.name)}</strong>
                                    </li>
                                )
                            }
                        </Filter>
                    </Sidebar>
                </div>

                <main>
                    <div className={styles.presentation}>
                        <header>
                            <img className={styles.logo} src={Logo} />
                            <h3>Lista de Tarefas</h3>
                        </header>
                        <strong>{project?.name}</strong>
                        <p>{project?.description}</p>
                    </div>

                    <div className={styles.options}>
                        <strong> {information}</strong>

                        <span>
                            <KeyReturn size={34} onClick={() => navigate(-1)} className={styles.btnReturn} />
                            <PlusCircle size={34} onClick={handleMessageAddShow} className={styles.btnAdd} />
                        </span>
                    </div>
                    {
                        filterTodo.map((todo: ITodo) => <TodoComponent id={todo.id}
                            name={todo.title}
                            status={todo.status}
                            key={todo.id}
                            onSubmit={() => onSubmitUpdateStatusTodo(todo.id, 'Finalizado')}
                            onClick={() => handleShowModalRemoveAdd(todo.id)}
                        >

                            <strong>{todo.title}</strong>
                            <p>{todo.status}</p>
                            {
                                todo.status === 'Em Aguardo' ?
                                    <Button className={styles.confirmButton}
                                        variant="primary"
                                        onClick={() => onSubmitUpdateStatusTodo(todo.id, 'Em Andamento')}
                                        value="Iniciar a Tarefa">
                                        Iniciar a Tarefa
                                    </Button> : ''
                            }

                            {
                                todo.status === 'Em Andamento' || todo.status === 'Finalizado' ?
                                    <Button className={styles.confirmButton}
                                        variant="danger"
                                        onClick={() => onSubmitUpdateStatusTodo(todo.id, 'Em Aguardo')}
                                        value="Retornar para Aguardo">
                                        Retornar para Aguardo
                                    </Button> : ''
                            }
                        </TodoComponent>
                        )
                    }


                    {/* Modal para Adicionar Tarefa */}
                    <ModalComponent show={showMessageAdd} handleClose={handleMessageAddClose}>
                        <ModalHeader title="Adicionar Nova Tarefa!" />
                        <ModalBody>
                            <Form onSubmit={onSubmitTodo}>
                                {
                                    message !== '' && <Alert variant={variant}
                                        onClose={handleClose}
                                        dismissible>
                                        {message}
                                    </Alert>
                                }
                                <InputComponent id="name"
                                    name="name"
                                    type="text"
                                    value={title}
                                    onChange={handleChangeTitle}
                                    label="Digite o Nome da Tarefa" />

                                <TextAreaComponent id="name"
                                    name="name"
                                    value={description}
                                    onChange={handleChangeDescription}
                                    label="Digite a Descrição da Tarefa" />

                                <Button className={styles.confirmButton}
                                    type={'submit'}
                                    variant="primary">Adicionar</Button>
                            </Form>
                        </ModalBody>
                    </ModalComponent>

                    {/** MODAL REMOVER TAREFA */}
                    <ModalComponent show={showRemoveTodo}
                        handleClose={handleShowModalRemoveClose}>
                        <ModalHeader title="A tarefa será removida!" />
                        <ModalBody>
                            <Form onSubmit={handleRemoveTodo}>
                                {
                                    message !== '' ? <Alert variant={variant} onClose={handleClose}>
                                        {message}
                                    </Alert>
                                        : (
                                            <>
                                                <p>Você realmente deseja remover essa tarefa?</p>
                                                <Button className={styles.confirmButton}
                                                    type={'submit'}
                                                    variant="danger">Remover</Button>
                                            </>
                                        )
                                }


                            </Form>
                        </ModalBody>
                    </ModalComponent>
                </main>
            </div>
        </div>
    )
}