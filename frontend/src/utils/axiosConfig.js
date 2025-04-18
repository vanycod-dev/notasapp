import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',// URL base del backend
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
        if (error.response.status === 401) { // Si el error es 401 (no autorizado)
            console.error('Token inválido o expirado'); // Mostrar un mensaje de error en la consola
            localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
            window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        }
        return Promise.reject(error); // Rechazar la promesa con el error
    }
);

export default api; // Exportar la instancia de axios configurada para su uso en otros archivos