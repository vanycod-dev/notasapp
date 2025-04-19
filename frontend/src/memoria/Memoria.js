import api from "../utils/axiosConfig";

const NOTAS_PUBLICAS = 'NotasPublicas';
const NOTAS_PRIVADAS = 'NotasPrivadas';
const USUARIO = 'Usuario';

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

// Guardar nota privada
export const guardarNotaPrivada = (nota) => {
    const response = api.post('/notes/', nota);
    console.log('Nota privada enviada:', response.data);
    return response;
}

// Funciones de usuario
export const obtenerUsuario = () => {
    return JSON.parse(localStorage.getItem(USUARIO)) || null;
}

export const guardarUsuario = (usuario) => {
    localStorage.setItem(USUARIO, JSON.stringify(usuario));
    return usuario;
}