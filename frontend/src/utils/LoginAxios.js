import api from "./axiosConfig";

export const login = async (data) => {
    try {
        const response = await api.post('/users/login', data); // Envía el objeto directamente
        
        // Acceso correcto al token (response.data.data.token)
        if (!response.data?.data?.token) {
            throw new Error('La respuesta no incluyó token');
        }
        
        // Devuelve solo la parte data de la respuesta
        return response.data;
        
    } catch (error) {
        console.error('Error detallado:', {
            message: error.message,
            response: error.response?.data,
            request: error.request
        });
        throw error;
    }
};