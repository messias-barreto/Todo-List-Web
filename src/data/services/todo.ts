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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })

    return data;

}

export const getTodosByProject = async (project_id: string) => {
    const data = await axios.get(`http://localhost:3300/todos/${project_id}`, {
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

export const getAllStatus = async () => {
    const data = await axios.get('http://localhost:3300/status-todo', {
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


export const deleteTodo = async (id: string) => {
    const data = await axios.delete(`http://localhost:3300/todos/${id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1lc3NpYXMuYmFycmV0byIsImlhdCI6MTY4MjYyMDk0NSwiZXhwIjoxNjg1MjEyOTQ1LCJzdWIiOiJkMjJiYjQ2NC04ZjUxLTRiNDktODBlZC04ZTUwZWZkMzE0ZDUifQ.dU2t7tTEvwC-Yy8hXF55SjpseUpSLg0Wbmv4mpwQMv4' //the token is a variable which holds the token
        }
    })
        .then(function (response) {
            return {
                    message: 'Tarefa foi Removida com sucesso!',
                    data: response.data
                }
        })
        .catch(function (error) {
            return error;
        })

    return data
}