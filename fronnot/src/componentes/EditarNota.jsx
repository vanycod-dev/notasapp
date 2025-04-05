import { useEffect, useRef, useState } from "react";
import { actualizarNotaPublica } from "../utils/CrearNota"; // Crea esta función para tu lógica de update

function EditarNota({ nota, onActualizada }) {
    const [formData, setFormData] = useState({
        titulo: nota.titulo || '',
        contenido: nota.contenido || '',
        publico: nota.publico || 'public'
    });

    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = formData.contenido;
        }
    }, [formData.contenido]);

    const enviarEdicion = async () => {
        if (!editorRef.current) return;

        const contenidoActual = editorRef.current.innerHTML;
        if (!formData.titulo || !contenidoActual.trim()) {
            alert('Completa todos los campos');
            return;
        }

        try {
            const notaActualizada = {
                ...nota,
                titulo: formData.titulo,
                contenido: contenidoActual,
                publico: formData.publico
            };
            await actualizarNotaPublica(notaActualizada); // Lógica de update en backend
            onActualizada(); // Callback para refrescar la lista o salir del modo edición
        } catch (error) {
            console.error("Error al editar:", error);
            alert('Error al editar la nota');
        }
    };

    const aplicarEstilo = (comando) => {
        editorRef.current.focus();
        if (!window.getSelection().toString()) return;
        document.execCommand(comando, false, null);
    };

    return (
        <div className="max-w-2xl bg-yellow-50 mx-auto my-2.5 p-2 border rounded-lg shadow-xl">
            <h2 className="font-bold mb-2">Editar Nota</h2>

            <div className="mb-2">
                <input
                    type="text"
                    value={formData.titulo}
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Título"
                />
            </div>

            <div className="mb-2">
                <select
                    value={formData.publico}
                    onChange={(e) => setFormData({ ...formData, publico: e.target.value })}
                    className="border p-2 rounded"
                >
                    <option value="public">Público</option>
                    <option value="priv">Privado</option>
                </select>
            </div>

            <div className="flex space-x-2 mb-2">
                {['bold', 'italic'].map((cmd) => (
                    <button
                        key={cmd}
                        className="border px-2 py-1 rounded hover:bg-gray-200"
                        onClick={() => aplicarEstilo(cmd)}
                    >
                        {cmd === 'bold' ? 'B' : 'I'}
                    </button>
                ))}
            </div>

            <div
                contentEditable
                ref={editorRef}
                className="min-h-[200px] max-h-[300px] overflow-y-auto bg-white border p-2 rounded mb-2"
            />

            <button
                onClick={enviarEdicion}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
            >
                Guardar Cambios
            </button>
        </div>
    );
}

export default EditarNota;
