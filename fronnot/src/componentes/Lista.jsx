import { useEffect, useState } from "react";
import { obtenerNotasPublicas } from "../utils/CrearNota";
import EditarNota from "./EditarNota";

function Lista() {
    const [notasPublicas, setNotasPublicas] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const fetchNotas = async () => {
        const notas = await obtenerNotasPublicas();
        setNotasPublicas(notas);
    };

    useEffect(() => {
        fetchNotas();
    }, []);

    const handleEditar = (id) => setEditandoId(id);
    const handleCerrarModal = () => setEditandoId(null);

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Notas Públicas</h1>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {notasPublicas.length > 0 ? (
                    notasPublicas.map((nota) => (
                        <div
                            key={nota.id}
                            className="bg-white shadow-lg rounded-2xl p-4 transition-transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-amber-600 mb-2">{nota.titulo}</h2>
                                <p className="text-gray-700 mb-2 line-clamp-3">{nota.contenido}</p>
                                <div className="text-sm text-gray-500">
                                    <p>📅 {nota.fecha}</p>
                                    <p>👤 {nota.usuario}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between gap-2">
                                <button
                                    onClick={() => handleEditar(nota.id)}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-0.5 rounded-lg transition text-xs"
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => console.log("Eliminar nota con id:", nota.id)}
                                    className="flex-1 bg-red-500/50 hover:bg-red-600 text-white py-1 px-0.5 rounded-lg transition text-xs"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No hay notas públicas disponibles.</p>
                )}
            </div>

            {editandoId && (
                <EditarNota
                    id={editandoId}
                    onCerrar={handleCerrarModal}
                    onActualizada={async () => {
                        await fetchNotas();
                        handleCerrarModal();
                    }}
                />
            )}
        </div>
    );
}

export default Lista;
