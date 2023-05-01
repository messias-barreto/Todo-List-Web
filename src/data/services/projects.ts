import { API } from "./api";

interface IProject{
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
    const data = await API.get('/projects', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })
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
    const data = await API.get(`/projects/${id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })
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
    const data = await API.get(`/projects/${id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })
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
    const data = await API.get('/categories-project', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error;
        })

    return data
}