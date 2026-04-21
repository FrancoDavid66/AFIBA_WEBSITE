import axios from "axios";

// Configura el baseURL apuntando a tu nueva API en Railway
const taskApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
  ? 'https://web-production-a852f.up.railway.app/famf/api/v1/PreRegistrationView/'  // URL de producción 
  : 'https://web-production-a852f.up.railway.app/famf/api/v1/PreRegistrationView/', // URL de desarrollo (o usa localhost:8000 si corres tu backend local)
});

export const getAllTasks = () => {
  return taskApi.get("/"); 
};

export const getTask = (id) => {
  return taskApi.get(`/${id}/`); 
};

export const createTask = (task) => {
  return taskApi.post("/", task); 
};

export const deleteTask = (id) => {
  return taskApi.delete(`/${id}/`); 
};

export const updateTask = (id, task) => {
  return taskApi.put(`/${id}/`, task); 
};