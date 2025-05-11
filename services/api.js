import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
})

// Funciones de servicio.

export const fetchTasks = () =>
    api.get('/todos?_limit=10').then(res => res.data);

export const createTask = (title) =>
    api.post('/todos', { title, completed: false }).then(res => res.data);

export const updateTask = (id, task) =>
    api.put(`/todos/${id}`, task).then(res => res.data);

export const deleteTask = (id) =>
    api.delete(`/todos/${id}`).then(res => id);
