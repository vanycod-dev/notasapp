const NOTAPUBLICA = 'NotasPublicas';
const USUARIO = 'Usuario';

export const obtenerNotasPublicas = () => {
    return JSON.parse(localStorage.getItem(NOTAPUBLICA)) || [];
}

export const guardarNota = (nota) => {
    const notasPublicas = obtenerNotasPublicas();

    notasPublicas.push(nota);
    localStorage.setItem(NOTAPUBLICA, JSON.stringify(notasPublicas));
    console.log('Nota guardada');
    return nota;
}

export const obtenerUsuario = () => {
    return JSON.parse(localStorage.getItem(USUARIO)) || null;
}
export const guardarUsuario = (usuario) => {
    localStorage.setItem(USUARIO, JSON.stringify(usuario));
    console.log('Usuario guardado en memoria:', usuario);
    return usuario;
}