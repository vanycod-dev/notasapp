import api from "./axiosConfig";

const login = async (data) => {
    const [usuario, password] = data;
    try {
        const response = await api.post('/users/login', { usuario, password });
        return response.data; // Retornar la respuesta del servidor
    } catch (error) {
        console.error('Error en el login:', error);
        throw error; // Lanzar el error para manejarlo en el componente
    }