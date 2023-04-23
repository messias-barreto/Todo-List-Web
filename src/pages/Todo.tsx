import { useEffect, useState } from "react";
import { Add } from "../components/Add";
import { Filter } from "../components/Filter";
import { InputComponent } from "../components/forms/InputComponent";
import { SelectComponent } from "../components/forms/SelectComponent";
import { TextAreaComponent } from "../components/forms/TextArea";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { addProject, getAllProjects } from "../data/services/projects";
import { getAllStatus, getTodosByProject } from "../data/services/todo";

import Logo from '../assets/images/logo.png';
import styles from './Todo.module.css';
import { TodoComponent } from "../components/Todo";
import { useParams } from "react-router-dom";
import { KeyReturn } from "@phosphor-icons/react";

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

    const [name, setName] = useState<string>('');
    const [description, setDesctiption] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const { project_id } = useParams();

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

    const onSubmitProject = async () => {
        event?.preventDefault()
        await addProject({ name, description, category })
        await handleTodo();
    }

    function handleChangeName() {
        setName(event.target.value);
    }

    function handleChangeDescription() {
        setDesctiption(event.target.value);
    }

    function handleChangeCategory() {
        setCategory(event.target.value);
    }

    function handleReturnStatusName(id: string | undefined) {
        const status = statusTodo.find(status => status.id === id);
        return status?.name;
    }

    async function handleCountTask() {
        const allTodo = todo.length;
        let completeTodo: number = 0;
        const status = statusTodo.find(st => st.name === 'Finalizado');

        if(status !== undefined) {
            completeTodo = todo.filter(t => t.status === status.id).length;
        }

        setInformation(`Tarefas: ${allTodo} | ${completeTodo}`);
    }

    function handleSearchTodoByStatus() {
        const category = todo.filter((pro: ITodo) => pro.status === event.target.value);
        setFilterTodo(category);
    }

    function getValueCategoryTodo(category_project: string): number {
        const projects = todo.filter((project: ITodo) => project.status === category_project)
        return projects.length;
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
                                statusTodo.map(todo =>
                                    <li key={todo.id}>
                                        <p>
                                            <input
                                                className={styles.checkFilter}
                                                type="radio"
                                                id={"radioListCategories"}
                                                name={"radioListCategories"}
                                                value={todo.id}
                                                onClick={handleSearchTodoByStatus} />
                                            {todo.name}
                                        </p>
                                        <strong> {getValueCategoryTodo(todo.id)}</strong>
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
                            <KeyReturn size={32} />
                            <Add title="Adicionar Nova Tarefa!" onSubmit={onSubmitProject} size={32}>
                                <InputComponent id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={handleChangeName}
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
                            status={handleReturnStatusName(todo.status)}
                            key={todo.id} />
                        )
                    }
                </main>
            </div>
        </div>
    )
}