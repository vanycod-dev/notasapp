import API from "./axiosConfig";

export const sendLoginData = async (data) => {
    console.log('Datos de inicio de sesión desde utils:', data);
    
    try {
        const response = await API.post('/auth/login', data);
        console.log('Respuesta del servidor:', response.data);
        
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token); // Guarda solo el token
            localStorage.setItem('user', response.data.username); // Guarda solo el token
            localStorage.setItem('user-id', response.data.id); // Guarda el userId si es necesario
        }

        return response.data;
    } catch (error) {
        console.error('Error al enviar los datos de inicio de sesión:', error.response?.data || error.message);
        throw error;
    }
};
