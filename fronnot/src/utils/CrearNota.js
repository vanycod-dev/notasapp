const NOTAS_PUBLICAS = 'notasPublicas';

export const obtenerNotasPublicas = () => {
    const notasPublicas = JSON.parse(localStorage.getItem(NOTAS_PUBLICAS)) || [];
    return notasPublicas;
}

export const crearNotaPublica = (nota) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevaNota = {
        id: Date.now(),
        ...nota,
        fecha: new Date().toLocaleString(),
        usuario: nota.usuario || 'anonimo',
    }
    notasPublicas.push(nuevaNota);
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(notasPublicas));
    console.log("Nota guardada en localStorage:", nuevaNota);
    // Aquí puedes agregar la lógica para enviar la nota a tu API o backend
};