import { useContext, useEffect, useState, useCallback } from 'react';
import NotasGrid from './NotasGrid';
import { obtenerNotasPrivadas, obtenerNotasPublicas } from '../memoria/Memoria';
import { AuthContext } from '../memoria/AuthContext';
import { normalizeNotes } from '../utils/normalizeNotes';

const MisNotas = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const [triggerReload, setTriggerReload] = useState(false);

  const fetchNotas = async () => {
    try {
      setLoading(true);
      const notasPublicas = normalizeNotes(obtenerNotasPublicas(), false);
      
      if (isAuthenticated) {
        const response = await obtenerNotasPrivadas();
        const notasPrivadas = normalizeNotes(response.data, true);
        setNotas([...notasPublicas, ...notasPrivadas]);
      } else {
        setNotas(notasPublicas);
      }
    } catch (error) {
      console.error('Error cargando notas:', error);
      setNotas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, [isAuthenticated, triggerReload]);

  // Función para forzar recarga
  const handleNotaUpdated = useCallback(() => {
    setTriggerReload(prev => !prev);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 px-4">Mis Notas</h1>
      
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {!loading && (
        <NotasGrid 
          notas={notas}
          esAutenticado={isAuthenticated}
          onNotaUpdated={handleNotaUpdated}
        />
      )}
    </div>
  );
};

export default MisNotas;