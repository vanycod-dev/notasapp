import api from "../utils/axiosConfig";

const NOTAS_PUBLICAS = 'NotasPublicas';

export const obtenerNotasPublicas = () => {
    return JSON.parse(localStorage.getItem(NOTAS_PUBLICAS)) || [];
}

export const guardarNotaPublica = (nota) => {
    const notasPublicas = obtenerNotasPublicas();
    notasPublicas.unshift(nota);
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(notasPublicas));
    return nota;
}

export const eliminarNotaPublica = (id) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevasNotas = notasPublicas.filter(nota => nota.id !== id);
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(nuevasNotas));
    return nuevasNotas;
}

export const obtenerNotasPrivadas = async () => {
    try {
        const response = await api.get('/notes');
        console.log('Respuesta completa del backend:', response);
        console.log('Datos de notas privadas:', response.data?.data);
        // Devuelve directamente response.data que ya contiene la estructura {success, message, data}
        return response.data;
    } catch (error) {
        console.error('Error al obtener notas privadas:', error);
        return { success: false, data: [] }; // Mantener misma estructura
    }
}