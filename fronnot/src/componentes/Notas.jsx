import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Notas() {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        publico: 'public'
    });
    const [autenticado, setAutenticado] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔍 Verificando autenticación...");
        const token = true; // Simulamos usuario autenticado
        setAutenticado(!!token);
    }, []);

    const enviarNota = async () => {
        if (!editorRef.current) return;

        const contenidoActual = editorRef.current.innerHTML;
        if (!formData.titulo || !contenidoActual.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        const notaNueva = {
            ...formData,
            contenido: contenidoActual,
            fecha: new Date().toISOString()
        };

        try {
            console.log("Nota creada:", notaNueva);
            // await crearNota(notaNueva); // Descomenta cuando tengas la función
            navigate('/list');
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

    // Versión alternativa más moderna (recomendada)
    // const aplicarEstiloModerno = (estilo) => {
    //     if (!editorRef.current) return;

    //     const selection = window.getSelection();
    //     if (!selection.rangeCount) return;

    //     const range = selection.getRangeAt(0);
    //     const span = document.createElement('span');
        
    //     switch(estilo) {
    //         case 'bold':
    //             span.style.fontWeight = 'bold';
    //             break;
    //         case 'italic':
    //             span.style.fontStyle = 'italic';
    //             break;
    //         case 'A+':
    //             span.style.fontSize = '1.2em';
    //             break;
    //         case 'A-':
    //             span.style.fontSize = '0.8em';
    //             break;
    //     }

    //     range.surroundContents(span);
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    // };

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