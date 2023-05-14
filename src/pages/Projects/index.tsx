import { PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Filter } from "../../components/Filter";
import { InputComponent } from "../../components/forms/InputComponent";
import { SelectComponent } from "../../components/forms/SelectComponent";
import { TextAreaComponent } from "../../components/forms/TextArea";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { Message } from "../../components/Message";
import { ModalBody } from "../../components/modal/ModalBody";
import { ModalComponent } from "../../components/modal/ModalComponent";
import { ModalHeader } from "../../components/modal/ModalHeader";
import { Sidebar } from "../../components/Sidebar";
import { Work } from "../../components/Work";
import { addProject, getAllCategories, getAllProjects } from "../../data/services/projects";
import styles from './Project.module.css';

interface IProject {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  qtd_todo?: number;
  qtd_todo_finish?: number;
}

interface IProjectCategory {
  id: string;
  name: string;
}

export function Projects() {
  const [project, setProject] = useState<IProject[]>([]);
  const [filterProject, setFilterProject] = useState<IProject[]>([]);
  const [projectCategory, setProjectCategory] = useState<IProjectCategory[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDesctiption] = useState<string>('');
  const [category, setCategory] = useState<string>('selectValue');

  const [loadingProject, setLoadingProject] = useState<boolean>(false);
  const [loadingAddProject, setLoadingAddProject] = useState<boolean>(false);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    setShowMessage(false);
  }
  const handleClose = () => setShow(false);

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [variant, setVariant] = useState<string>('');

  const handleProjects = async () => {
    setLoadingProject(true);
    await getAllProjects().then(res => {
      setProject(res)
      setFilterProject(res)
      setLoadingProject(false);
    })
  }

  const onGetCategoryProject = async () => {
    await getAllCategories().then(res => setProjectCategory(res))
  }

  const onSubmitProject = async (event: FormEvent) => {
    event?.preventDefault();
    setLoadingAddProject(true);

    if (category === 'selectValue') {
      setMessage('Selecione uma Categoria Válida!')
      setVariant('warning');
      setShowMessage(true);
      setLoadingAddProject(false);

      return false;
    }

    const data = await addProject({ name, description, category });
    setVariant('danger')

    if (data.status === 201) {
      setVariant('success');
      setName('');
      setDesctiption('')
      handleProjects();
    }

    setMessage(data.data.message)
    setShowMessage(true);
    setLoadingAddProject(false);
  }

  function handleChangeName(event: ChangeEvent<HTMLTextAreaElement>) {
    setName(event.target.value);
  }

  function handleChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setDesctiption(event.target.value);
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleSearchProjectsByCategory(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.value === 'all') {
      setFilterProject(project);

      return false;
    }
    const category = project.filter((pro: IProject) => pro.category_id === event.target.value);
    setFilterProject(category);
  }

  function getValueCategoryProject(category_project: string): number {
    const projects = project.filter((project: IProject) => project.category_id === category_project)
    return projects.length;
  }

  function getPercentageProject(qtd_todo: number | undefined, qtd_finish: number | undefined) {
    let total: number = qtd_todo !== undefined ? qtd_todo : 0;
    let totalFinalizados: number = qtd_finish !== undefined ? qtd_finish : 0;
    if (total == 0) { return total; }

    const percente = (totalFinalizados * 100) / total;
    return percente;
  }

  useEffect(() => {
    handleProjects()
    onGetCategoryProject()
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div>
          <Sidebar>
            <Filter title="Listagem por Categorias"
                    qtdItens={project.length}
                    // @ts-ignore ts2304
                    className={styles.checkFilter}
                    type="radio"
                    id={"radioListCategories"}
                    name={"radioListCategories"}
                    value={'all'}
                    onClick={handleSearchProjectsByCategory}>
              {
                projectCategory.map(project =>
                  <li key={project.id}>
                    <p>
                      <input
                        className={styles.checkFilter}
                        type="radio"
                        id={"radioListCategories"}
                        name={"radioListCategories"}
                        value={project.id}
                        //@ts-ignore 
                        onClick={handleSearchProjectsByCategory} />
                      {project.name}
                    </p>
                    <strong> {getValueCategoryProject(project.id)}</strong>
                  </li>
                )
              }
            </Filter>
          </Sidebar>
        </div>

        <main>
          <Menu />
          <div className={styles.projects}>
            {
              loadingProject === true ?   <div className={styles.waitPage}>
                                            <Spinner as="span" animation="border" variant="dark"/>
                                          </div>
              : (
                <>
                  {
                    filterProject.map((pro: IProject) => <Link to={`/todos/${pro.id}`} key={pro.id}>
                                                            <Work key={pro.id}
                                                                  name={pro.name}
                                                                  description={pro.description}
                                                                  percent={getPercentageProject(pro.qtd_todo, pro.qtd_todo_finish)} />
                                                          </Link>)
                  }
                  
                  <PlusCircle size={250} onClick={handleShow} className={styles.btnAdd} />
                </>
              )
            }
          </div>

          <ModalComponent show={show} handleClose={handleClose}>
            <ModalHeader title="Adicionar Novo Project!" />
            <ModalBody>
              {
                loadingProject === true ?  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                : (
                  
                showMessage === true ? <Message message={message}
                                                show
                                                variant={variant}
                                                onClose={() => setShowMessage(false)}
                                                dismissible /> :
                  <>
                    <Form onSubmit={onSubmitProject}>
                      <InputComponent id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChangeName}
                        label="Digite o Nome do Projeto" />

                      <TextAreaComponent id="name"
                        name="name"
                        value={description}
                        onChange={handleChangeDescription}
                        label="Digite a Descrição do Projeto" />

                      <SelectComponent label="Selecione a Categoria"
                        value={category}
                        onChange={handleChangeCategory}>
                        <option value={'selectValue'}>Selecione</option>
                        {
                          projectCategory.map((categories: IProjectCategory) => <option key={categories.id}
                            value={categories.id}>
                            {categories.name}
                          </option>)
                        }
                      </SelectComponent>

                      <Button className={styles.confirmButton}
                        type={'submit'}
                        variant="primary">
                          {
                            loadingAddProject === true && (
                              <Spinner  as="span" 
                                        animation="border" 
                                        size="sm" 
                                        role="status" 
                                        className={styles.Spinner}
                                        aria-hidden="true"/>
                            )  
                          }
                          <span>Adicionar</span>
                      </Button>

                    </Form>
                  </>
                )
              }
            </ModalBody>
          </ModalComponent>
        </main>
      </div>
    </div>
  )
}