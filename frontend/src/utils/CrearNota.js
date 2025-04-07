import API from "./axiosConfig";
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
export const crearNotaPrivada = async (nota) => {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Usuario no autenticado');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    try {
        const res = await API.post('/notes', {
            title: nota.titulo,
            content: nota.contenido
        }, config);

        console.log('Nota privada creada en backend:', res.data);
        return res.data;
    } catch (err) {
        console.error('Error al crear nota privada:', err);
        throw err;
    }
};
export const obtenerNotasPrivadas = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuario no autenticado');

    try {
        const res = await API.get('/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error('Error al obtener notas privadas:', err);
        throw err;
    }
};

export const actualizarNotaPrivada = async (nota) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuario no autenticado');

    try {
        const res = await API.put(`/notes/${nota.id}`, {
            title: nota.titulo,
            content: nota.contenido
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Nota privada actualizada:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error al actualizar nota privada:", err);
        throw err;
    }
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