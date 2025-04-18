const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { usuario, email, password } = req.body;
  try {
    const existingUser = await user.finByUsername(usuario);
    const existingEmail = await user.finByEmail(email);
    
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });
    if (existingEmail) return res.status(400).json({ message: 'El email ya existe' });

    await user.create(usuario, email, password);
    res.status(201).json({ message: 'Usuario creado exitosamente ', user: usuario });
  
  } catch (error) {
    console.error('⚠️ Error al registrar el usuario ❌:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'El usuario o el email ya existe' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const existingUser = await user.finByUsername(usuario);
    if (!existingUser) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  
  } catch (error) {
    console.error('⚠️ Error al iniciar sesión ❌:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}
module.exports = {
  register,
  login
};