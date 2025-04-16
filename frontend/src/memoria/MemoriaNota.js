import { guardarNota } from "./Memoria";

const crearId = () => {
    const id = new Date().getTime();
    return id;
}
export const notaCreada = (nota) => {
    const nuevaNota = {
        id: crearId(),
        ...nota,
        fechaCreacion: new Date().toISOString(),
        usuario: 'anonimo',
    };
    console.log('Nota enviada paso: 01 nota:', nuevaNota);
    guardarNota(nuevaNota); // Guardar la nota en memoria
    return nuevaNota;
}

export const notaPrivadaCreada = (nota) => {
    const nuevaNota = {
        id: crearId(),
        ...nota,
        fechaCreacion: new Date().toISOString(),
        usuario: 'vany',
    };
    console.log('Nota privada enviada paso: 01 nota:', nuevaNota);
    return nuevaNota;
}