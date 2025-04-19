import api from "../utils/axiosConfig";
import { guardarNotaPublica } from "./Memoria";

const crearId = () => {
    return new Date().getTime().toString();
}

export const crearNota = (nota) => {
    const nuevaNota = {
        id: crearId(),
        ...nota,
        fechaCreacion: new Date().toISOString(),
        usuario: 'anonimo',
        privacodad: 'publico',
    };

    guardarNotaPublica(nuevaNota);
    console.log('Nota pública creada:', nuevaNota);

    return nuevaNota;
}

export const crearNotaPrivada = async (nota) => {
    const nuevaNota = {
        title: nota.titulo,
        content: nota.contenido,
    }
    try {
        const response = await api.post('/notes', nuevaNota);
        console.log('Nota privada enviada');
        const notaCreada = response.data;
        // console.log('Nota privada creada:', notaCreada);
        return notaCreada;

    }
    catch (error) {
        console.error('Error al crear nota privada:', error);
    }
}