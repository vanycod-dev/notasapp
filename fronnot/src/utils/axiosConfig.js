import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Reemplázalo con la URL de tu backend
  headers: { 'Content-Type': 'application/json' }
});

export default API;
