import { useRef, useState, useEffect } from "react";

function ModalEditarNota({ nota, onClose, onSave }) {
    const [titulo, setTitulo] = useState(nota.titulo);
    const [contenido, setContenido] = useState(nota.contenido);
    const editorRef = useRef(null);

    // Inicializar el contenido del editor
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = contenido;
        }
    }, []);

    const guardarCambios = () => {
        if (!titulo.trim()) {
            alert("Por favor ingresa un título");
            return;
        }
        
        if (!contenido.trim()) {
            alert("Por favor ingresa contenido");
            return;
        }
        
        const notaActualizada = {
            ...nota,
            titulo: titulo,
            contenido: contenido,
            fechaActualizacion: new Date().toISOString()
        };

        onSave(notaActualizada);
    };

    const aplicarEstilo = (style, value = null) => {
        if (!editorRef.current) return;
        
        editorRef.current.focus();
        document.execCommand(style, false, value);
        setContenido(editorRef.current.innerHTML);
    };

    const limpiarFormato = () => {
        if (!editorRef.current) return;
        
        const texto = editorRef.current.innerText;
        editorRef.current.innerHTML = texto;
        setContenido(texto);
    };

    return ( 
        <div className="fixed h-full inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl bg-white rounded-lg shadow-xl w-full">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Editar Nota</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="p-4">
                    {/* Barra de herramientas */}
                    <div className="p-0.5 flex flex-row border-b gap-1 flex-wrap mb-4">
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

                    {/* Formulario de edición */}
                    <input 
                        type="text" 
                        value={titulo}
                        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 bg-white focus:ring-purple-500"
                        placeholder="Título" 
                        onChange={(e) => setTitulo(e.target.value)}
                        maxLength={100}
                    />
                    
                    <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {nota.esPrivada ? "Privada" : "Pública"}
                        </div>
                    </div>

                    <div 
                        className="p-2.5 border rounded min-h-[200px] max-h-[250px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                        contentEditable={true} 
                        ref={editorRef} 
                        suppressContentEditableWarning={true}
                        onInput={(e) => setContenido(e.target.innerHTML)}
                        style={{ minHeight: '200px' }}
                    ></div>
                </div>
                
                <div className="p-4 border-t flex justify-end gap-2">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={guardarCambios}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                        disabled={!titulo.trim() || !contenido.trim()}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarNota;