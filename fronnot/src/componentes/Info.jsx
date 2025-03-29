function Info() {
    return ( 
        <>
            <div className="max-w-2xl bg-gray-200 mx-auto my-2.5 p-2 border rounded-lg shadow-2xl">
                <section>
                    <h2 className="text-2xl font-bold text-center">Nota App</h2>
                    <p>Hola, si llegaste hasta aquí es porque te pasa lo mismo que a mí, y eso es tener que ver un anuncio
                    por cierto tiempo para poder crear una nota, editar o simplemente para poder descansar de los anuncios.
                    Tienes que acceder a una versión Pro, donde el único beneficio es no tener anuncios y alguna que otra
                    función. Pero no sabes qué app instalar y si vale la pena pagar por una o por otra que tiene más funciones,
                    pero no tiene las herramientas que buscas. Pues tranquilo, para eso está Nota App, que es una aplicación de
                    notas en línea, la cual fue creada por <a href="https://github.com/jhovanhrmz0211" className="text-blue-700 font-bold hover:text-blue-500">Jhovan HR</a> en colaboración con <span className="text-blue-700 font-bold hover:text-blue-500">Perla GREEN</span>, en la parte de diseño.
                    </p>
                </section>
                <section className="mt-3">
                    <h3>Actualmente, nos encontramos en desarrollo con la <span className="font-bold">versión:</span> <span className=" hover:text-gray-500 cursor-pointer">1.0.0</span> </h3>
                    <p className="font-bold inline">Fecha de lanzamiento: </p><span className="text-gray-950">08/03/2025</span>
                </section>

                <section className="mt-2.5">
                    <h3>¿Qué encontrarás en <span className="font-bold">Notes App</span>?</h3>
                    <p>Podrás crear notas públicas que se almacenan en el dispositivo de creación. Podrás editarlas, eliminarlas o crearlas sin límite. Además, podrás agregar algunos estilos a la nota. También tendrás la opción de crear una cuenta e iniciar sesión, lo que te dará acceso a más funciones, como crear una nota <span className="text-blue-800 font-bold">privada</span> que podrás llevar a cualquier dispositivo que desees. Pero si olvidaste cerrar sesión, no te preocupes, contamos con un cierre automático después de 8 horas a partir del momento en que se inició sesión.</p>

                    <h4 className="mt-2.5 font-bold">Próximamente:</h4>
                    <p>Se agregarán más funciones y mejoras para dar más estilo a las notas. También se podrán crear grupos de notas.</p>
                </section>
            </div>
        </>
     );
}

export default Info;