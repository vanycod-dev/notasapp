const noteModel = require('../models/noteModel');
const bcrypt = require('bcryptjs');

// Crear usuario
export.crearUsuario = async (req, res) => {
    try {
        const {usuario, email, password} = req.body;
        const passwordHashed = await bcrypt.hash(password)
    } catch (error) {
        
    }
}

// Crear nota
exports.createNote = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const usuario_id = req.user.id; // Asume que el middleware auth añade el user ID
    const noteId = await noteModel.createNote(titulo, contenido, usuario_id);
    res.status(201).json({ id: noteId, mensaje: 'Nota creada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nota' });
  }
};

// Actualizar nota
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    const usuario_id = req.user.id;
    const updated = await noteModel.updateNote(id, titulo, contenido, usuario_id);
    if (!updated) return res.status(404).json({ error: 'Nota no encontrada' });
    res.json({ mensaje: 'Nota actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

// Eliminar nota
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;
    const deleted = await noteModel.deleteNote(id, usuario_id);
    if (!deleted) return res.status(404).json({ error: 'Nota no encontrada' });
    res.json({ mensaje: 'Nota eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};