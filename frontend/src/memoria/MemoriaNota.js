import api from "../utils/axiosConfig";
import { guardarNotaPublica } from "./Memoria";

const crearId = () => {
    return new Date().getTime().toString();
}

export const crearNota = (nota) => {
    const nuevaNota = {
        id: crearId(),
        ...nota,
        fecha_creacion: new Date().toISOString(),
        esPrivada: false,
        usuario: 'anonimo',
    };

    guardarNotaPublica(nuevaNota);
    console.log('Nota pública creada:', nuevaNota);

    return nuevaNota;
}

export const crearNotaPrivada = async (nota) => {
    try {
        const response = await api.post('/notes', {
            title: nota.titulo,
            content: nota.contenido,
            esPrivada: true // Aunque no se guarde en BD, lo enviamos por consistencia
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear nota privada:', error);
        throw error;
    }
}

export const eliminarNotaPrivada = async (id) => {
    try {
        await api.delete(`/notes/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar nota privada:', error);
        throw error;
    }
}