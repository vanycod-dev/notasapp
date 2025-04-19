const note = require('../models/noteModel');

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const usuario_id = req.userId; // <<-- ID del token

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'El título y contenido son obligatorios',
      data: null
    });
  }

  try {
    const nuevaNota = await note.create(usuario_id, title, content);
    res.status(201).json({
      success: true,
      message: 'Nota creada exitosamente',
      data: nuevaNota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la nota',
      data: null
    });
  }
};

const getAllNotes = async (req, res) => {
  const usuario_id = req.userId; // <<-- ID del token

  try {
    const notas = await note.getAll(usuario_id);
    res.status(200).json({
      success: true,
      message: 'Notas obtenidas exitosamente',
      data: notas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las notas',
      data: null
    });
  }
};

const updateNote = async (req, res) => {
  const { note_id } = req.params;
  const { title, content } = req.body;

  try {
    const affectedRows = await note.update(note_id, title, content);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nota no encontrada',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Nota actualizada exitosamente',
      data: { note_id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la nota',
      data: null
    });
  }
};

const deleteNote = async (req, res) => {
  const { note_id } = req.params;

  try {
    const affectedRows = await note.delete(note_id);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nota no encontrada',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Nota eliminada exitosamente',
      data: { note_id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la nota',
      data: null
    });
  }
};

module.exports = { createNote, getAllNotes, updateNote, deleteNote };