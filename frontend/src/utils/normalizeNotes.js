// src/utils/normalizeNotes.js
export const normalizeNote = (note, isPrivate = false) => {
    return {
      id: note.id || note._id || Date.now().toString(),
      titulo: note.titulo || note.title || 'Sin título',
      contenido: note.contenido || note.content || '',
      fechaCreacion: note.fechaCreacion || note.createdAt || note.fecha_creacion || new Date().toISOString(),
      esPrivada: isPrivate,
      // Campos adicionales para compatibilidad
      ...(note.userId && { userId: note.userId }),
      ...(note.usuario && { usuario: note.usuario })
    };
  };
  
  export const normalizeNotes = (notes, isPrivate = false) => {
    return Array.isArray(notes) 
      ? notes.map(note => normalizeNote(note, isPrivate))
      : [];
  };