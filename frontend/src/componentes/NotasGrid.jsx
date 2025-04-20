// src/components/NotasGrid.jsx
import NotaCard from './NotaCard';

const NotasGrid = ({ notas, onDeleteNota, onEditNota, esAutenticado }) => {
  // Separar notas públicas y privadas si es necesario
  const notasPublicas = notas.filter(nota => !nota.esPrivada);
  const notasPrivadas = notas.filter(nota => nota.esPrivada);

  return (
    <div className="space-y-6">
      {esAutenticado && notasPrivadas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Notas Privadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notasPrivadas.map(nota => (
              <NotaCard 
                key={`privada-${nota.id}`} 
                nota={nota}
                onDelete={onDeleteNota}
                onEdit={onEditNota}
              />
            ))}
          </div>
        </div>
      )}

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
                onEdit={onEditNota}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotasGrid;