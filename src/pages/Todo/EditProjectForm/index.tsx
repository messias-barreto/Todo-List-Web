import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { InputComponent } from "../../../components/forms/InputComponent";
import { SelectComponent } from "../../../components/forms/SelectComponent";
import { TextAreaComponent } from "../../../components/forms/TextArea";
import { editProject, getAllCategories, getProjectByid } from "../../../data/services/projects";

interface IProps {
    project_id: string;
    onSubmit: (name: string, description: string, category: string) => Promise<void>
}

interface IProjectCategory {
    id: string;
    name: string;
}

export function EditProjectForm({ project_id, onSubmit }: IProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [categoryProject, setCategoryProject] = useState<IProjectCategory[]>([]);

    async function handleGetProject() {
        await getProjectByid(project_id).then(res => {
            setName(res.name);
            setDescription(res.description);
            setCategory(res.category_id);
        });
    }

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setName(event?.target.value)
    }

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    const handleChangeCategory = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCategory(event.target.value)
    }


    const onGetCategoryProject = async () => {
        await getAllCategories().then(res => setCategoryProject(res))
    }

    useEffect(() => {
        handleGetProject()
        onGetCategoryProject()
    }, [])

    return (
        <Form onSubmit={() => onSubmit(name, description, category)}>
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
                    categoryProject.map((categories: IProjectCategory) => <option key={categories.id}
                        value={categories.id}>
                        {categories.name}
                    </option>)
                }
            </SelectComponent>

            <InputComponent id="name"
                name="name"
                type="submit"
                value="Editar Projeto"
                placeholder="Adicionar" />
        </Form>

    )
}