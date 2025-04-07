import { useEffect, useRef, useState } from "react";
import { actualizarNotaPublica, obtenerNotasPublicas } from "../utils/CrearNota";

function EditarNota({ id, onCerrar, onActualizada }) {
    const editorRef = useRef(null);
    const [nota, setNota] = useState(null);
    const [formData, setFormData] = useState({ titulo: "", contenido: "" });
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const cargarNota = async () => {
            const todas = await obtenerNotasPublicas();
            const encontrada = todas.find((n) => n.id === id);
            setNota(encontrada);
            if (encontrada) {
                setFormData({
                    titulo: encontrada.titulo,
                    contenido: encontrada.contenido
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

    const enviarEdicion = async () => {
        if (!editorRef.current) return;
        const contenidoActual = editorRef.current.innerHTML;

        if (!formData.titulo || !contenidoActual.trim()) {
            alert("Completa todos los campos");
            return;
        }

        try {
            setCargando(true);
            const notaActualizada = {
                ...nota,
                titulo: formData.titulo,
                contenido: contenidoActual,
            };
            await actualizarNotaPublica(notaActualizada);
            onActualizada();
        } catch (error) {
            console.error("Error al editar:", error);
            alert("Error al editar la nota");
        } finally {
            setCargando(false);
        }
    };

    const aplicarEstilo = (comando) => {
        editorRef.current.focus();
        if (!window.getSelection().toString()) return;
        document.execCommand(comando, false, null);
    };

    if (!nota) return null;

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white max-w-xl w-full rounded-xl p-6 shadow-lg relative animate-fadeIn">
                <button
                    onClick={onCerrar}
                    className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-lg font-bold mb-3">Editar Nota</h2>

                <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Título"
                />

                <div className="flex gap-2 mb-2">
                    {["bold", "italic"].map((cmd) => (
                        <button
                            key={cmd}
                            className="border px-2 py-1 rounded hover:bg-gray-200"
                            onClick={() => aplicarEstilo(cmd)}
                        >
                            {cmd === "bold" ? "B" : "I"}
                        </button>
                    ))}
                </div>

                <div
                    contentEditable
                    ref={editorRef}
                    className="min-h-[200px] max-h-[300px] overflow-y-auto bg-white border p-2 rounded mb-4"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={enviarEdicion}
                        disabled={cargando}
                        className={`px-4 py-2 font-bold rounded ${
                            cargando
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                    >
                        {cargando ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditarNota;
