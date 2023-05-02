import { API } from "./api";

interface IProject {
    id?: string;
    name: string;
    description: string;
    category: string;
}

export const addProject = async ({ name, description, category}: IProject) => {
    const project = {
        name, 
        description, 
        category_id: category
    }
    
     const data = await API.post('projects',project)
    return data;

}

export const getAllProjects = async () => {
    const data = await API.get('/projects')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.error(error);
            return error;
        })

    return data
}

export const getProjectByid = async (id: string) => {
    const data = await API.get(`/projects/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.error(error);
            return error;
        })

    return data
}


export const getProjectById = async (id: string) => {
    const data = await API.get(`/projects/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.error(error);
            return error;
        })

    return data
}

export const getAllCategories = async () => {
    const data = await API.get('/categories-project')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error;
        })

    return data
}

export const editProject = async ({ name, description, category, id}: IProject) => {
    const project = {
        name, 
        description, 
        category_id: category
    }
    
     const data = await API.patch(`projects/${id}`,project)
    return data;

}
