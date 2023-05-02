import { API } from "./api";

interface ITodo {
    id?: string;
    title: string;
    status?: string;
    description?: string;
    project_id: string;
}

export const updateStatusTodo = async (status: string, id: string = 'error') => {
    const data = await API.patch(`/todos/${id}`, { status })
    return data;
}

export const addTodo = async ({ title, description, project_id, status }: ITodo) => {
    const todo = {
        title,
        description,
        status
    }

    const data = await API.post(`/todos/${project_id}`, todo)
    return data;

}

export const getTodosByProject = async (project_id: string) => {
    const data = await API.get(`/todos/${project_id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error;
        })

    return data
}

export const getAllStatus = async () => {
    const data = await API.get('/status-todo')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error;
        })

    return data
}


export const deleteTodo = async (id: string) => {
    const data = await API.delete(`/todos/${id}`)
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