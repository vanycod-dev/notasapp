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
export const eliminarNotaPublica = (id) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevasNotas = notasPublicas.filter(nota => nota.id !== id);
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(nuevasNotas));
    console.log("Nota eliminada de localStorage:", id);
    // Aquí puedes agregar la lógica para eliminar la nota de tu API o backend
};

export const actualizarNotaPublica = (notaActualizada) => {
    const notasPublicas = obtenerNotasPublicas();
    const nuevasNotas = notasPublicas.map(nota => 
        nota.id === notaActualizada.id ? { ...nota, ...notaActualizada } : nota
    );
    localStorage.setItem(NOTAS_PUBLICAS, JSON.stringify(nuevasNotas));
    console.log("Nota actualizada en localStorage:", notaActualizada);
    // Aquí puedes agregar la lógica para actualizar la nota en tu API o backend
};