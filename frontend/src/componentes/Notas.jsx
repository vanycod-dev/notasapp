import { useEffect, useRef, useState } from "react";
import { crearNotaPrivada, crearNotaPublica } from "../utils/CrearNota";
// import { useNavigate } from "react-router";

function Notas() {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        publico: 'public'
    });
    const [autenticado, setAutenticado] = useState(false);
    const editorRef = useRef(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAutenticado(true);
        } else {
            setAutenticado(false);
        }
        // Limpiar el contenido del editor al cargar el componente
    }, []);

    const enviarNota = async () => {
        if (!editorRef.current) return;

        const contenidoActual = editorRef.current.innerHTML;
        if (!formData.titulo || !contenidoActual.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const notaNueva = {
                titulo: formData.titulo,
                contenido: contenidoActual,
                publico: formData.publico,
                usuario: autenticado ? localStorage.getItem('user') : 'anonimo'
            };
            console.log("Nota a enviar:", notaNueva);
            if(formData.publico === 'public') {
                crearNotaPublica(notaNueva);
            } else if(formData.publico === 'priv') {
                // Aquí puedes agregar la lógica para crear una nota privada
                await crearNotaPrivada(notaNueva); // Descomenta cuando tengas la función
            }
            // navigate('/lista');
        } catch (error) {
            console.error("Error:", error);
            alert('Error al crear la nota');
        }
    };

    const aplicarEstilo = (comando) => {
        if (!editorRef.current) return;

        editorRef.current.focus();
        const selection = window.getSelection();
        
        if (!selection.toString()) {
            console.warn("No hay texto seleccionado");
            return;
        }

        switch(comando) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'A+':
                document.execCommand('fontSize', false, '4');
                break;
            case 'A-':
                document.execCommand('fontSize', false, '2');
                break;
        }
    };

    return (
        <div className="max-w-2xl bg-gray-200 mx-auto my-2.5 p-2 border rounded-lg shadow-2xl">
            {/* Barra de herramientas */}
            <div className="p-0.5 flex flex-row border-b-1">
                {['bold', 'italic', 'A+', 'A-'].map((estilo) => (
                    <button
                        key={estilo}
                        className="border w-7 m-1 py-0.5 cursor-pointer rounded-sm hover:bg-gray-300"
                        onClick={() => aplicarEstilo(estilo)}
                    >
                        {estilo === 'bold' ? 'B' : 
                         estilo === 'italic' ? 'I' : 
                         estilo === 'A+' ? 'A+' : 'A-'}
                    </button>
                ))}
            </div>

            {/* Formulario */}
            <div className="pt-2.5">
                <input
                    type="text"
                    value={formData.titulo}
                    className="my-1.5 mr-1.5 p-1.5 border rounded min-h-5 focus:outline-none"
                    placeholder="Ingresa un título"
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                />
                
                {autenticado ? (
                    <select
                        value={formData.publico}
                        className="border rounded p-1.5"
                        onChange={(e) => setFormData({...formData, publico: e.target.value})}
                    >
                        <option value="public">Público</option>
                        <option value="priv">Privado</option>
                    </select>
                ) : (
                    <div className="text-center p-1.5 border rounded inline-block text-gray-800">
                        Público
                    </div>
                )}

                <div
                    className="p-2.5 border rounded min-h-[200px] max-h-[400px] overflow-y-auto focus:outline-none bg-white"
                    contentEditable
                    ref={editorRef}
                    onInput={(e) => setFormData({...formData, contenido: e.currentTarget.innerHTML})}
                />
            </div>

            <div>
                <button
                    className="my-2.5 cursor-pointer py-2 px-4 bg-purple-500/50 shadow-lg shadow-purple-500/50 hover:bg-purple-500 text-white font-bold rounded"
                    onClick={enviarNota}
                >
                    Crear Nota
                </button>
            </div>
        </div>
    );
}

export default Notas;