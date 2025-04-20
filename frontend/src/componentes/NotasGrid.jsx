import { useState } from 'react';
import NotaCard from './NotaCard';
import ModalEditarNota from './ModalEditarNota';
import { editarNota } from '../memoria/MemoriaNota';

const NotasGrid = ({ notas, onDeleteNota, esAutenticado }) => {
  // Estado para controlar la nota que se está editando
  const [notaEditando, setNotaEditando] = useState(null);
  
  // Función para manejar la actualización de notas
  const handleActualizarNota = (notaActualizada) => {
    editarNota(notaActualizada)
    setNotaEditando(null);
  };

  // Separar notas públicas y privadas
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

      {/* Notas privadas */}
      {esAutenticado && notasPrivadas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Notas Privadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notasPrivadas.map(nota => (
              <NotaCard 
                key={`privada-${nota.id}`} 
                nota={nota}
                onDelete={onDeleteNota}
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
                onDelete={onDeleteNota}
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