import axios from "axios";

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
    
     const data = await axios.post('http://127.0.0.1:3300/projects',project , {
         headers: {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
         }
     })

    return data;

}

export const getAllProjects = async () => {
    const data = await axios.get('http://localhost:3300/projects', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
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
    const data = await axios.get(`http://localhost:3300/projects/${id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
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
    const data = await axios.get(`http://localhost:3300/projects/${id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
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
    const data = await axios.get('http://localhost:3300/categories-project', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
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