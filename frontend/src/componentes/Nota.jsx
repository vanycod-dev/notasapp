import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { notaCreada, notaPrivadaCreada } from "../memoria/MemoriaNota";

function Nota() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [publico, setPublico] = useState('publico');
    const [autenticado, setAutenticado] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Lógica de autenticación aquí si es necesaria
        setAutenticado(false); // Cambia a true si el usuario está autenticado
    }, []);

    const enviarNota = () => {
        if (!titulo.trim()) {
            alert("Por favor ingresa un título");
            return;
        }
        
        if (!contenido.trim()) {
            alert("Por favor ingresa contenido");
            return;
        }
        
        const nota = {
            titulo: titulo,
            contenido: contenido,
            publico: publico
        };

        if(autenticado) {
            notaPrivadaCreada(nota); // nota privada enviada a memoria
            console.log('Nota privada enviada paso: 00, nota: ', nota);
            navigate('/informacion');
            return;
        }
        
        console.log('Nota enviada paso: 00, nota: ', nota);
        notaCreada(nota); // nota publica enviada a memoria
        

        navigate('/informacion');
    }

    const aplicarEstilo = (style, value = null) => {
        if (!editorRef.current) return;
        
        editorRef.current.focus();
        document.execCommand(style, false, value);
        setContenido(editorRef.current.innerHTML);
    }

    const limpiarFormato = () => {
        if (!editorRef.current) return;
        
        const texto = editorRef.current.innerText;
        editorRef.current.innerHTML = texto;
        setContenido(texto);
    }

    return ( 
        <div className="max-w-2xl bg-gray-200 mx-auto my-2.5 p-2 border rounded-lg shadow-2xl">
            {/* Barra de herramientas simplificada */}
            <div className="p-0.5 flex flex-row border-b gap-1 flex-wrap">
                <button 
                    className="border w-7 h-7 flex items-center justify-center m-1 cursor-pointer rounded-sm hover:bg-gray-300 font-bold"
                    onClick={() => aplicarEstilo('bold')}
                    title="Negrita"
                >B</button>
                
                <button 
                    className="border w-7 h-7 flex items-center justify-center m-1 cursor-pointer rounded-sm hover:bg-gray-300 italic"
                    onClick={() => aplicarEstilo('italic')}
                    title="Itálica"
                >I</button>
                
                <button 
                    className="border w-7 h-7 flex items-center justify-center m-1 cursor-pointer rounded-sm hover:bg-gray-300"
                    onClick={() => aplicarEstilo('fontSize', '4')}
                    title="Aumentar tamaño"
                >A+</button>
                
                <button 
                    className="border w-7 h-7 flex items-center justify-center m-1 cursor-pointer rounded-sm hover:bg-gray-300"
                    onClick={() => aplicarEstilo('fontSize', '2')}
                    title="Reducir tamaño"
                >A-</button>
                
                <button 
                    className="border px-2 h-7 flex items-center justify-center m-1 cursor-pointer rounded-sm hover:bg-gray-300"
                    onClick={limpiarFormato}
                    title="Limpiar formato"
                >Limpiar</button>
            </div>

            {/* Formulario de Nota */}
            <div className="pt-2.5">
                <input 
                    type="text" 
                    value={titulo}
                    className="w-full my-1.5 p-2 border rounded min-h-5 focus:outline-none focus:ring-2 bg-white focus:ring-purple-500"
                    placeholder="Ingresa un título" 
                    onChange={(e) => setTitulo(e.target.value)}
                    maxLength={100}
                />
                
                <div className="mb-2">
                    {!autenticado ? (
                        <div className="text-center p-1.5 border rounded inline-block text-gray-800 bg-white">
                            Público
                        </div>
                    ) : (
                        <select 
                            value={publico}
                            className="border rounded p-1.5 bg-white"
                            onChange={(e) => setPublico(e.target.value)}
                        >
                            <option value="public">Público</option>
                            <option value="priv">Privado</option>
                        </select>
                    )}
                </div>

                <div 
                    className="p-2.5 border rounded min-h-[200px] max-h-[400px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    contentEditable={true} 
                    ref={editorRef} 
                    suppressContentEditableWarning={true}
                    onInput={(e) => setContenido(e.target.innerHTML)}
                    placeholder="Escribe tu nota aquí..."
                    style={{ minHeight: '200px' }}
                ></div>
            </div>

            <div className="flex justify-end">
                <button 
                    className="my-2.5 cursor-pointer py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors disabled:opacity-50"
                    onClick={enviarNota}
                    disabled={!titulo.trim() || !contenido.trim()}
                >
                    Crear Nota
                </button>
            </div>
        </div>
    );
}

export default Nota;