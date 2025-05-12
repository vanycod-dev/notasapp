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

export const editarNotaPublica = (notaActualizada) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevasNotas = notasPublicas.map(nota => 
        nota.id === notaActualizada.id ? notaActualizada : nota
    );
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(nuevasNotas));
    return Promise.resolve(notaActualizada); // Simulando una promesa
}

export const eliminarNotaPublica = (id) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevasNotas = notasPublicas.filter(nota => nota.id !== id);
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(nuevasNotas));
    return Promise.resolve(true); // Simulando una promesa
}

export const obtenerNotasPrivadas = async () => {
    try {
        const response = await api.get('/notes');
        // Asegurarse de que la respuesta tenga la estructura correcta ayuda de deep
        if (response.data && Array.isArray(response.data.data)) {
            return {
                success: true,
                data: response.data.data
            };
        }
        throw new Error('Formato de respuesta inválido');
    } catch (error) {
        console.error('Error al obtener notas privadas:', error);
        return { success: false, data: [] };
    }
}