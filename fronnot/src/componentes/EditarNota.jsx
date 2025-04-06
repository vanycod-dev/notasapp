import { useEffect, useRef, useState } from "react";
import { actualizarNotaPublica, obtenerNotasPublicas } from "../utils/CrearNota";

function EditarNota({ id, onActualizada }) {
    const editorRef = useRef(null);
    const [nota, setNota] = useState(null);

    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        publico: 'public'
    });

    useEffect(() => {
        const cargarNota = async () => {
            const todas = await obtenerNotasPublicas();
            const encontrada = todas.find((n) => n.id === id);
            setNota(encontrada);
            if (encontrada) {
                setFormData({
                    titulo: encontrada.titulo,
                    contenido: encontrada.contenido,
                    publico: encontrada.publico
                });
            }
        };

        cargarNota();
    }, [id]);

    useEffect(() => {
        if (editorRef.current && formData.contenido) {
            editorRef.current.innerHTML = formData.contenido;
        }
    }, [formData.contenido]);

    if (!nota) return null;

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
            await actualizarNotaPublica(notaActualizada);
            onActualizada();
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
        <div className="max-w-2xl bg-yellow-50 mx-auto my-4 p-4 border rounded-lg shadow-xl">
            <h2 className="font-bold mb-3">Editar Nota</h2>

            <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Título"
            />

            <select
                value={formData.publico}
                onChange={(e) => setFormData({ ...formData, publico: e.target.value })}
                className="w-full p-2 border rounded mb-2"
            >
                <option value="public">Público</option>
                <option value="priv">Privado</option>
            </select>

            <div className="flex gap-2 mb-2">
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
                className="min-h-[200px] max-h-[300px] overflow-y-auto bg-white border p-2 rounded mb-4"
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
