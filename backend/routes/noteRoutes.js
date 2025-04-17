const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación JWT
router.use(authMiddleware.verifyToken);

// CRUD de Notas
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;