import api from "./axiosConfig";

const registro = async (data) => {
    console.log('Datos recibidos:', data); // { usuario: "...", email: "...", password: "..." }

    try {
        const response = await api.post('/users/register', data);
        console.log('Respuesta del servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error en el registro:', error.response?.data || error.message);
        throw error; // Re-lanza el error para manejarlo en el componente
    }
};

export default registro;