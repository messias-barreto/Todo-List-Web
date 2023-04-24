import { useEffect, useState } from "react";
import { Add } from "../components/Add";
import { Filter } from "../components/Filter";
import { InputComponent } from "../components/forms/InputComponent";
import { TextAreaComponent } from "../components/forms/TextArea";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { addTodo, getAllStatus, getTodosByProject, updateStatusTodo } from "../data/services/todo";
import { useNavigate } from "react-router-dom";

import Logo from '../assets/images/logo.png';
import styles from './Todo.module.css';
import { TodoComponent } from "../components/Todo";
import { useParams } from "react-router-dom";
import { KeyReturn } from "@phosphor-icons/react";
import { Form, Modal } from "react-bootstrap";
import { SelectComponent } from "../components/forms/SelectComponent";

interface ITodo {
    id?: string;
    title: string;
    description: string;
    status: string;
}

interface IStatusTodo {
    id: string;
    name: string;
}

export function Todo() {
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [filterTodo, setFilterTodo] = useState<ITodo[]>([]);
    const [statusTodo, setStatusTodo] = useState<IStatusTodo[]>([]);
    const [information, setInformation] = useState<string>('');

    const [title, setTitle] = useState<string>('');
    const [description, setDesctiption] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const { project_id } = useParams();
    const navigate = useNavigate();

    const handleTodo = async () => {
        const id = project_id !== undefined ? project_id : '';
        await getTodosByProject(id).then(res => {
            setTodo(res)
            setFilterTodo(res)
        })
    }

    const handleAllStatusTodo = async () => {
        await getAllStatus().then(res => setStatusTodo(res));
    }

    const onSubmitTodo = async () => {
        const id = project_id !== undefined ? project_id : '';

        event?.preventDefault()
        await addTodo({ title, description, project_id: id })
        await handleTodo();
    }

    const onSubmitUpdateStatusTodo = async (id: string | undefined) => {
        event?.preventDefault()
        await updateStatusTodo(status, (id !== undefined ? id : 'error'))
        await handleTodo();
    }

    function handleChangeTitle() {
        setTitle(event.target.value);
    }

    function handleChangeDescription() {
        setDesctiption(event.target.value);
    }

    function handleChangeStatus() {
        setStatus(event.target.value);
    }

    async function handleCountTask() {
        const allTodo = todo.length;
        const status = todo.filter(st => st.status === 'Finalizado');

        if (status !== undefined) {
            setInformation(`Tarefas: ${allTodo} | ${status.length}`);
        }
    }

    function handleSearchTodoByStatus() {
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
                        <strong>Concluir a Reforma da Casa</strong>
                        <p>
                            vale sempre compro foge nadar. você andas vida causa mão piranhas, lobo chifre. starchy dois it caramba. acidentes. pouco, Daqui importante morre todo a é coisas I A A são using Jesus I passageiro, moral sem mais mim existo. linha vale exceção. for pra Vermelho últimos tarde. te Daqui golfinho? para nada o de existo. costas. nem todo que de mais Por o importante are tamanho que concordo bicicleta nadar. bet e Vermelho mão you Não sempre mundo. não frente, número não amanhã. Mais número e uiva in
                        </p>
                    </div>

                    <div className={styles.options}>
                        <strong> {information}</strong>

                        <span>
                            <KeyReturn size={34} onClick={() => navigate(-1)} className={styles.btnReturn} />
                            <Add title="Adicionar Nova Tarefa!" onSubmit={onSubmitTodo} size={32}>
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

                                <InputComponent id="name"
                                    name="name"
                                    type="submit"
                                    placeholder="Adicionar" />
                            </Add>
                        </span>
                    </div>
                    {
                        filterTodo.map((todo: ITodo) => <TodoComponent id={todo.id}
                            name={todo.title}
                            status={todo.status}
                            key={todo.id}>

                            <strong>{todo.title}</strong>
                            <p>{todo.status}</p>

                            <Form onSubmit={() => onSubmitUpdateStatusTodo(todo.id)}>
                                <SelectComponent label="Selecione a Categoria"
                                    value={status}
                                    onChange={handleChangeStatus}>
                                    {
                                        statusTodo.map((statusTodo: IStatusTodo) =>
                                            <option key={statusTodo.id}
                                                value={statusTodo.id}>
                                                {statusTodo.name}
                                            </option>
                                        )
                                    }
                                </SelectComponent>

                                <InputComponent id="name"
                                    name="name"
                                    type="submit"
                                    value="Alterar"
                                    placeholder="Adicionar" />
                            </Form>
                        </TodoComponent>
                        )
                    }
                </main>
            </div>
        </div>
    )
}