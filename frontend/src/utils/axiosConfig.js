import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',// URL base del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

//interceptores para añadir el token JWT automaticamente a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Añadir el token al encabezado de autorización
    }
    return config; // Devolver la configuración de la solicitud modificada  
});

// interceptor para manejar errores de globales
api.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, devolverla
    (error) => {
        if (error.response.status === 401) {
            console.error('Token inválido o expirado');
            localStorage.removeItem('token'); // Eliminar el token del almacenamiento local si caduca
            window.location.href = '/login';
        }
        return Promise.reject(error); // Rechazar la promesa con el error
    }
);

export default api;