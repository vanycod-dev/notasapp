const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Rutas para el registro y el inicio de sesión de usuarios
router.post('/register', register);
router.post('/login', login);

// Exportar las rutas
module.exports = router;