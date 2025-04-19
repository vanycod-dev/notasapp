import api from "../utils/axiosConfig";

const NOTAS_PUBLICAS = 'NotasPublicas';

// Obtener todas las notas públicas
export const obtenerNotasPublicas = () => {
    return JSON.parse(localStorage.getItem(NOTAS_PUBLICAS)) || [];
}

// Guardar nota pública
export const guardarNotaPublica = (nota) => {
    const notasPublicas = obtenerNotasPublicas();
    notasPublicas.unshift(nota); // Agregar al inicio para orden más reciente
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(notasPublicas));
    return nota;
}

export const obtenerNotasPrivadas = async () => {
    try {
        const response = await api.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Error al obtener notas privadas:', error);
        return [];
    }
}