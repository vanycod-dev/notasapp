function Informacion() {
    return ( 
        <>
            <div className="w-4xl mx-auto flex flex-col items-center bg-gray-100 p-4 shadow-2xl rounded-lg mt-4 mb-4">
                <h2 className="text-3xl text-purple-800 font-bold">Notas App</h2>
                <p>
                ¿Hola, cómo estás?, ¿Cansado de usar varias aplicaciones de notas donde en cada una te encuentras con anuncios molestos? ¿Tener que pagar por la versión Pro solo para eliminar los anuncios, pero sin obtener más funcionalidades que las de la versión gratuita? ¿O simplemente no sabes qué aplicación usar debido a que todas tienen demasiados anuncios?

                ¡Pues no sufras más! Esta es la aplicación que necesitas: una herramienta sencilla, <b>sin anuncios</b> , sin pagos por versiones Pro y con la que podrás crear notas sin necesidad de una cuenta. Tus notas se guardarán automáticamente en el dispositivo donde las crees. Si lo prefieres, también puedes crear una cuenta para acceder a tus notas desde <b>cualquier dispositivo</b> (computadora, tablet o celular), sin importar el sistema operativo, ya que es una aplicación web compatible con todos los navegadores.

                No dudes en probarla, y si tienes sugerencias, ¡contáctanos!
                </p>

                <h3 className="text-lg mt-4.5 mb-4">Versión 1.0.0</h3>

                <p>
                Esta aplicación fue creada como proyecto para mi portafolio, así como para solventar una necesidad personal: la de crear notas o dejar información rápidamente. Las apps que suelo usar o están llenas de anuncios o carecen de versión web, lo que limita su utilidad.

                En este proyecto, recibí la invaluable ayuda de <span className="font-bold text-purple-900">Perla Green</span> en el diseño y proceso creativo, especialmente para definir y agregar funcionalidades. Por mi parte (<span className="font-bold text-purple-900">VanyCod</span>), me encargué de todo el código, tanto del Frontend como del Backend.

                Actualmente, nos encontramos en fase de desarrollo. Por ahora, la aplicación incluye:

                Estilos básicos para las notas.

                Funcionalidades esenciales: crear, editar y eliminar notas (tanto públicas como privadas).

                En la próxima actualización, añadiremos más características y una sección informativa donde detallaremos las nuevas funciones planeadas.


                </p>
            </div>
        </>
     );
}

export default Informacion;