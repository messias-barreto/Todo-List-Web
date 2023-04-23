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
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
         }
     })

    return data;

}

export const getAllProjects = async () => {
    const data = await axios.get('http://localhost:3300/projects', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODIwNjA3NzQsImV4cCI6MTY4NDY1Mjc3NCwic3ViIjoiNTdjNzdhNTUtNWEzYi00ZjUxLWI0YWMtYWIzMmFhZWUyMTc4In0.TvcKzp2iApJdAcg8lXz_ntSOTMDbGptkoXjGx1MQ_Po' //the token is a variable which holds the token
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