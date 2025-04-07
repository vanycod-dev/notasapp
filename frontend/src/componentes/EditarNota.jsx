import { useEffect, useRef, useState } from "react";
import { actualizarNotaPublica, actualizarNotaPrivada, obtenerNotasPublicas } from "../utils/CrearNota";

function EditarNota({ id, onCerrar }) {
  const editorRef = useRef(null);
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: ''
  });

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

  if (!nota) return null;

  const enviarEdicion = async () => {
    if (!editorRef.current) return;
    const contenidoActual = editorRef.current.innerHTML.trim();

    if (!formData.titulo.trim() || !contenidoActual || contenidoActual === "<br>") {
      alert('Completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const notaActualizada = {
        ...nota,
        titulo: formData.titulo,
        contenido: contenidoActual,
      };
      if (nota.esPrivada) {
        await actualizarNotaPrivada(notaActualizada);
      } else {
        await actualizarNotaPublica(notaActualizada);
      }      
    } catch (error) {
      console.error("Error al editar:", error);
      alert('Error al editar la nota');
    } finally {
      setLoading(false);
    }
  };

  const aplicarEstilo = (comando) => {
    editorRef.current.focus();
    if (!window.getSelection().toString()) return;
    document.execCommand(comando, false, null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-[fadeInUp_0.3s_ease-out_forwards]">
        <h2 className="font-bold mb-4 text-xl text-center text-gray-800">Editar Nota</h2>

        <input
          type="text"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          placeholder="Título"
        />

        <div className="flex gap-2 mb-2">
          {['bold', 'italic'].map((cmd) => (
            <button
              key={cmd}
              className="border px-2 py-1 rounded hover:bg-gray-200 text-sm font-medium"
              onClick={() => aplicarEstilo(cmd)}
            >
              {cmd === 'bold' ? 'B' : 'I'}
            </button>
          ))}
        </div>

        <div
          contentEditable
          ref={editorRef}
          className="min-h-[150px] max-h-[300px] overflow-y-auto bg-gray-50 border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCerrar}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={enviarEdicion}
            disabled={loading}
            className={`${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            } bg-green-500 text-white font-bold px-4 py-2 rounded`}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarNota;
