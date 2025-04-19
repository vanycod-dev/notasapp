import { guardarNotaPrivada, guardarNotaPublica } from "./Memoria";

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

export const crearNotaPrivada = (nota) => {
    const nuevaNota = {
        title: nota.titulo,
        content: nota.contenido,
    }
    guardarNotaPrivada(nuevaNota);
    console.log('Nota privada:', nuevaNota);
}