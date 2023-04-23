import axios from 'axios';

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