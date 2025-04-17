const pool = require('./db');

// Crear una nota
const createNote = async (titulo, contenido, usuario_id) => {
  const [result] = await pool.query(
    'INSERT INTO notas (titulo, contenido, usuario_id) VALUES (?, ?, ?)',
    [titulo, contenido, usuario_id]
  );
  return result.insertId;
};

// Obtener todas las notas de un usuario
const getNotesByUser = async (usuario_id) => {
  const [notes] = await pool.query(
    'SELECT * FROM notas WHERE usuario_id = ?',
    [usuario_id]
  );
  return notes;
};

// Actualizar una nota
const updateNote = async (id, titulo, contenido, usuario_id) => {
  const [result] = await pool.query(
    'UPDATE notas SET titulo = ?, contenido = ? WHERE id = ? AND usuario_id = ?',
    [titulo, contenido, id, usuario_id]
  );
  return result.affectedRows > 0;
};

// Eliminar una nota
const deleteNote = async (id, usuario_id) => {
  const [result] = await pool.query(
    'DELETE FROM notas WHERE id = ? AND usuario_id = ?',
    [id, usuario_id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  createNote,
  getNotesByUser,
  updateNote,
  deleteNote,
};