const express = require('express');
const { createNote, getAllNotes, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getAllNotes); // Cambiado a '/' para consistencia
router.put('/:note_id', authMiddleware, updateNote);
router.delete('/:note_id', authMiddleware, deleteNote);

module.exports = router;