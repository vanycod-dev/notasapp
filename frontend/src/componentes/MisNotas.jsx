import { useState } from 'react';
import NotasGrid from './NotasGrid';

const MisNotas = () => {
  const [notas, setNotas] = useState([
    // Ejemplo de datos
    {
      id: 1,
      titulo: "Mi primera nota",
      contenido: "<p>Este es el contenido de mi primera nota importante</p>",
      fechaCreacion: new Date().toISOString(),
      esPrivada: false
    },
    {
        id: 2,
        titulo: "Mi primera nota",
        contenido: "<p>Este es el contenido de mi primera nota importante</p>",
        fechaCreacion: new Date().toISOString(),
        esPrivada: true
      },
    // ... más notas
  ]);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      setNotas(notas.filter(nota => nota.id !== id));
    }
  };

  const handleEdit = (nota) => {
    // Lógica para editar la nota
    console.log("Editar nota:", nota);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 px-4">Mis Notas</h1>
      <NotasGrid 
        notas={notas} 
        onDeleteNota={handleDelete}
        onEditNota={handleEdit}
      />
    </div>
  );
};

export default MisNotas;