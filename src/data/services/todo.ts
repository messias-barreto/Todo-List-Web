import axios from 'axios';

interface ITodo {
    id?: string;
    title: string;
    status?: string;
    description?: string;
    project_id: string;
}

export const updateStatusTodo = async (status: string, id: string = 'error') => {
     const data = await axios.patch(`http://127.0.0.1:3300/todos/${id}`, { status }, {
         headers: {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
         }
     })

    return data;

}

export const addTodo = async ({ title, description, project_id, status }: ITodo) => {
    const todo = {
        title, 
        description,
        status
    }
    
     const data = await axios.post(`http://127.0.0.1:3300/todos/${project_id}`, todo, {
         headers: {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjQ2MzIwOSwiZXhwIjoxNjg1MDU1MjA5LCJzdWIiOiI4NjI4MzQ3Ny1mZDBjLTRmM2ItOGFiMi04ZjE5ZGNmMWEzOGYifQ.YNoQuJ1sMfNlVyQJ841BkPqqzitBcXDp1lGYyVepMMg' //the token is a variable which holds the token
         }
     })

    return data;

}

export const getTodosByProject = async (project_id: string) => {
    const data = await axios.get(`http://localhost:3300/todos/${project_id}`, {
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

export const getAllStatus = async () => {
    const data = await axios.get('http://localhost:3300/status-todo', {
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