// src/components/NotaCard.jsx
import { useState } from 'react';

const NotaCard = ({ nota, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de privacidad */}
      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
        nota.esPrivada ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {nota.esPrivada ? 'Privada' : 'Pública'}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{nota.titulo}</h3>
        </div>
        
        <div 
          className="text-gray-600 mb-4 line-clamp-3 prose" 
          dangerouslySetInnerHTML={{ __html: nota.contenido }}
        ></div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(nota.fechaCreacion).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          
          <div className={`flex space-x-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button 
              onClick={() => onEdit(nota)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              title="Editar nota"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={() => onDelete(nota.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar nota"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Efecto de acento de color */}
      <div className={`h-1 w-full ${nota.esPrivada ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
    </div>
  );
};

export default NotaCard;