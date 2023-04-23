import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Add } from "../components/Add";
import { Filter } from "../components/Filter";
import { InputComponent } from "../components/forms/InputComponent";
import { SelectComponent } from "../components/forms/SelectComponent";
import { TextAreaComponent } from "../components/forms/TextArea";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Work } from "../components/Work";
import { addProject, getAllCategories, getAllProjects } from "../data/services/projects";
import styles from './Home.module.css';

interface IProject {
  id?: string;
  name: string;
  description: string;
  category_id: string;
}

interface IProjectCategory {
  id: string;
  name: string;
}

export function Home() {
  const [project, setProject] = useState<IProject[]>([]);
  const [filterProject, setFilterProject] = useState<IProject[]>([]);
  const [projectCategory, setProjectCategory] = useState<IProjectCategory[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDesctiption] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleProjects = async () => {
    await getAllProjects().then(res => {
      setProject(res)
      setFilterProject(res)
    })
  }

  const onGetCategoryProject = async () => {
    await getAllCategories().then(res => setProjectCategory(res))
  }

  const onSubmitProject = async () => {
    event?.preventDefault()
    await addProject({ name, description, category })
    await handleProjects();
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

  function handleSearchProjectsByCategory() {
    const category = project.filter((pro: IProject) => pro.category_id === event.target.value);
    setFilterProject(category);
  }

  function getValueCategoryProject(category_project: string): number {
    const projects = project.filter((project: IProject) => project.category_id === category_project)
    return projects.length;
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
            <Filter title="Listagem por Categorias">
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
          {
            filterProject.map((pro: IProject) =>
              <Link to={`/todos/${pro.id}`} key={pro.id}>
                <Work
                  key={pro.id}
                  name={pro.name}
                  description={pro.description} />
              </Link>
            )
          }

          <Add title="Adicionar Novo Projeto!" onSubmit={onSubmitProject} size={200}>
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
              {
                projectCategory.map((categories: IProjectCategory) => <option key={categories.id}
                  value={categories.id}>
                  {categories.name}
                </option>)
              }
            </SelectComponent>

            <InputComponent id="name"
              name="name"
              type="submit"
              placeholder="Adicionar" />
          </Add>
        </main>
      </div>
    </div>
  )
}