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
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
         }
     })

    return data;

}

export const addTodo = async ({ title, description, project_id }: ITodo) => {
    const todo = {
        title, 
        description
    }
    
     const data = await axios.post(`http://127.0.0.1:3300/todos/${project_id}`, todo, {
         headers: {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
         }
     })

    return data;

}

export const getTodosByProject = async (project_id: string) => {
    const data = await axios.get(`http://localhost:3300/todos/${project_id}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
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