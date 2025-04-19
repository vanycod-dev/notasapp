const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { usuario, email, password } = req.body;

  try {
    const existingUser = await user.finByUsername(usuario);
    const existingEmail = await user.finByEmail(email);

    if (existingUser || existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'El usuario o email ya existe',
        data: null
      });
    }

    await user.create(usuario, email, password);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: { usuario, email }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario',
      data: null
    });
  }
};

const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const existingUser = await user.finByUsername(usuario);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Usuario no encontrado',
        data: null
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña incorrecta',
        data: null
      });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: { token, user: { id: existingUser.id, usuario: existingUser.usuario } }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      data: null
    });
  }
};

module.exports = { register, login };