// src/components/MisNotas.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NotasGrid from './NotasGrid';
import { obtenerNotasPrivadas, obtenerNotasPublicas } from '../memoria/Memoria';
import { AuthContext } from '../memoria/AuthContext';
import { normalizeNotes } from '../utils/normalizeNotes';

const MisNotas = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        setLoading(true);
        
        // Obtener y normalizar notas públicas
        const notasPublicas = normalizeNotes(obtenerNotasPublicas(), false);
        
        if (isAuthenticated) {
          // Obtener y normalizar notas privadas
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

    fetchNotas();
  }, [isAuthenticated]);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      setNotas(notas.filter(nota => nota.id !== id));
    }
  };

  const handleEdit = (nota) => {
    navigate(`/editar-nota/${nota.id}`, { state: { nota } });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 px-4">Mis Notas</h1>
      
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {!loading && notas.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No hay notas</h3>
          <p className="text-gray-500 mb-4">
            {isAuthenticated 
              ? "Crea tu primera nota pública o privada" 
              : "Inicia sesión para crear notas privadas o crea una nota pública"}
          </p>
          <button 
            onClick={() => navigate(isAuthenticated ? '/crear-nota' : '/registro')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isAuthenticated ? 'Crear Nota' : 'Registrarse'}
          </button>
        </div>
      )}

      {!loading && notas.length > 0 && (
        <NotasGrid 
          notas={notas} 
          onDeleteNota={handleDelete}
          onEditNota={handleEdit}
          esAutenticado={isAuthenticated}
        />
      )}
    </div>
  );
};

export default MisNotas;