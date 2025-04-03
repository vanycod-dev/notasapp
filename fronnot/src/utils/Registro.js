import API from "./axiosConfig";

export const sendRegistrationData = async (data) => {
    console.log('Datos de registro desde utils:', data);
    
    try {
        // Envía el objeto `data` directamente
        const response = await API.post('/auth/register', data);
        console.log('Respuesta del servidor:', response.data);
        return response.data; // Maneja la respuesta según sea necesario
    } catch (error) {
        console.error('Error al enviar los datos de registro:', error.response?.data || error.message);
        throw error; // Maneja el error según sea necesario
    }
};
