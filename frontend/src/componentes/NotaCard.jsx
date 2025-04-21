import { useState } from 'react';

const NotaCard = ({ nota, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-[200px] flex flex-col ${
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

      {/* Contenido de la tarjeta - Contenedor principal con altura controlada */}
      <div className="p-4 flex flex-col h-full">
        {/* Encabezado con título (altura fija) */}
        <div className="flex justify-between items-start mb-2 h-8 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 truncate">{nota.titulo}</h3>
        </div>
        
        {/* Contenido de la nota (altura flexible con scroll si es necesario) */}
        <div 
          className="text-gray-600 h-16 text-sm flex-grow overflow-y-auto mb-2 custom-scrollbar"
          dangerouslySetInnerHTML={{ __html: nota.contenido }}
        />
        
        {/* Pie de tarjeta (altura fija) */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {new Date(nota.fechaCreacion).toLocaleDateString('es-ES')}
          </span>
          
          {/* Botones de acción */}
          <div className={`flex space-x-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              title="Editar nota"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar nota"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de color inferior */}
      <div className={`h-1 w-full ${nota.esPrivada ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
    </div>
  );
};

export default NotaCard;