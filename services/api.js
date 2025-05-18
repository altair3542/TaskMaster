// services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

/** Obtiene las primeras 10 tareas */
export const fetchTasks = () =>
  api.get('/todos?_limit=10').then(res => res.data);

/** Crea una nueva tarea */
export const createTask = title =>
  api.post('/todos', { title, completed: false }).then(res => res.data);

/**
 * Actualiza parcial (PATCH) una tarea.
 * En caso de fallo (e.g. id >= 100), devolvemos un fallback que
 * preserva los campos que pasamos en `updates`.
 */
export const updateTask = async (id, updates) => {
  try {
    const res = await api.patch(`/todos/${id}`, updates);
    return res.data;
  } catch (err) {
    console.warn(`PATCH /todos/${id} falló, usando fallback`, err.message);
    // Fallback: devolvemos un objeto con el id y los campos actualizados
    return { id, ...updates };
  }
};

/** Elimina una tarea */
export const deleteTask = id =>
  api.delete(`/todos/${id}`).then(() => id);
