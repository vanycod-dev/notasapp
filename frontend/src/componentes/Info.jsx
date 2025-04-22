function Informacion() {
    return ( 
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl my-8">
            {/* Encabezado principal */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-purple-700 mb-4">Notas App</h2>
                <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
            </div>

            {/* Primera sección */}
            <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-6">
                    ¿Hola, cómo estás? ¿Cansado de usar aplicaciones de notas llenas de anuncios molestos? 
                    ¿Tener que pagar por la versión Pro solo para eliminar anuncios, sin obtener más funcionalidades? 
                    ¿O simplemente no sabes qué aplicación usar debido a la saturación de publicidad?
                </p>
                
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 mb-6">
                    <p className="text-gray-800 leading-relaxed">
                        <span className="font-bold text-purple-700">¡No sufras más!</span> Esta es la aplicación que necesitas: 
                        una herramienta <span className="font-semibold">sencilla</span>, <span className="font-semibold text-purple-700">sin anuncios</span>, 
                        <span className="font-semibold"> sin pagos ocultos</span> y con la que podrás crear notas sin necesidad de una cuenta. 
                        Tus notas se guardarán automáticamente en el dispositivo donde las crees.
                    </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                    Si lo prefieres, también puedes crear una cuenta para acceder a tus notas desde 
                    <span className="font-semibold text-purple-700"> cualquier dispositivo</span> (computadora, tablet o celular), 
                    sin importar el sistema operativo, ya que es una aplicación web compatible con todos los navegadores.
                </p>
                
                <p className="text-gray-700 italic mt-6">
                    No dudes en probarla, y si tienes sugerencias, ¡contáctanos!
                </p>
            </div>

            {/* Separador */}
            <div className="w-full h-px bg-gray-200 my-8"></div>

            {/* Sección de versión */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Versión 1.0.0</h3>
                <p className="text-gray-500">Actualizado: {new Date().toLocaleDateString('es-ES')}</p>
            </div>

            {/* Segunda sección */}
            <div className="mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                    Esta aplicación fue creada como proyecto para mi portafolio, así como para solventar una necesidad personal: 
                    la de crear notas o dejar información rápidamente. Las apps que suelo usar o están llenas de anuncios 
                    o carecen de versión web, lo que limita su utilidad.
                </p>

                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        En este proyecto, recibí la invaluable ayuda de <span className="font-bold text-purple-700">Perla Green</span> 
                        en el diseño y proceso creativo, especialmente para definir y agregar funcionalidades. 
                        Por mi parte (<span className="font-bold text-purple-700">VanyCod</span>), me encargué de todo el código, 
                        tanto del Frontend como del Backend.
                    </p>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">Estado actual del proyecto:</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Estilos básicos para las notas</li>
                    <li>Funcionalidades esenciales: crear, editar y eliminar notas (tanto públicas como privadas)</li>
                    <li>Autenticación de usuarios</li>
                </ul>

                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Próximas actualizaciones:</h4>
                    <p className="text-gray-700">
                        En la próxima versión añadiremos más características y una sección informativa 
                        donde detallaremos las nuevas funciones planeadas.
                    </p>
                </div>
            </div>

            {/* Llamado a la acción */}
            <div className="text-center mt-10">
                <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                    Contáctanos para sugerencias
                </button>
            </div>
        </div>
    );
}

export default Informacion;