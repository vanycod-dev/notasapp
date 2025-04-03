const Note = require('../models/Note'); // Importar el modelo
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.user.id; // Asegúrate de que `req.user` tenga `id`

  try {
    await Note.create(user_id, title, content);
    res.status(201).json({ msg: 'Nota creada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la nota' });
  }
};


const getNotes = async (req, res) => {
  const user_id = req.user.id; // ✅ CORREGIDO: Debe ser `id`

  try {
    const notes = await Note.getAllByUser(user_id); // ✅ Se pasa `user_id`
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
};

module.exports = { createNote, getNotes };
