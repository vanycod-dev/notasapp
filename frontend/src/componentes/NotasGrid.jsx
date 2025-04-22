import { useState, useEffect } from 'react';
import NotaCard from './NotaCard';
import ModalEditarNota from './ModalEditarNota';
import ModalConfirmacion from './ModalConfirmacion';
import { editarNota, eliminarNota } from '../memoria/MemoriaNota';

const NotasGrid = ({ notas: notasIniciales, esAutenticado, onNotaUpdated }) => {
  const [notaEditando, setNotaEditando] = useState(null);
  const [notaAEliminar, setNotaAEliminar] = useState(null);
  const [notas, setNotas] = useState(notasIniciales);

  useEffect(() => {
    setNotas(notasIniciales);
  }, [notasIniciales]);

  const handleActualizarNota = async (notaActualizada) => {
    try {
      await editarNota(notaActualizada);
      setNotas(prevNotas => 
        prevNotas.map(nota => 
          nota.id === notaActualizada.id ? notaActualizada : nota
        )
      );
      setNotaEditando(null);
      // Notificar al componente padre para recargar datos
      onNotaUpdated();
    } catch (error) {
      console.error('Error al actualizar nota:', error);
    }
  };

  const handleDeleteNota = (nota) => {
    setNotaAEliminar(nota);
  };

  const confirmarEliminacion = async () => {
    const { id, esPrivada } = notaAEliminar;
    try {
      await eliminarNota(id, esPrivada);
      setNotas(prevNotas => prevNotas.filter(nota => nota.id !== id));
      setNotaAEliminar(null);
      // Notificar al componente padre para recargar datos
      onNotaUpdated();
    } catch (error) {
      console.error('Error al eliminar nota:', error);
    }
  };

  // Resto del código se mantiene igual...
  const notasPublicas = notas.filter(nota => !nota.esPrivada);
  const notasPrivadas = notas.filter(nota => nota.esPrivada);

  return (
    <div className="space-y-6">
      {/* Modal de edición */}
      {notaEditando && (
        <ModalEditarNota
          nota={notaEditando}
          onClose={() => setNotaEditando(null)}
          onSave={handleActualizarNota}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {notaAEliminar && (
        <ModalConfirmacion
          mensaje={`¿Estás seguro que deseas eliminar la nota "${notaAEliminar.titulo}"?`}
          onConfirm={confirmarEliminacion}
          onCancel={() => setNotaAEliminar(null)}
        />
      )}

      {/* Notas privadas */}
      {esAutenticado && notasPrivadas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Notas Privadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notasPrivadas.map(nota => (
              <NotaCard 
                key={`privada-${nota.id}`} 
                nota={nota}
                onDelete={() => handleDeleteNota(nota)}
                onEdit={() => setNotaEditando(nota)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Notas públicas */}
      {notasPublicas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">
            {esAutenticado ? 'Notas Públicas' : 'Todas las Notas'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notasPublicas.map(nota => (
              <NotaCard 
                key={`publica-${nota.id}`}
                nota={nota}
                onDelete={() => handleDeleteNota(nota)}
                onEdit={() => setNotaEditando(nota)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotasGrid;