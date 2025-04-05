const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findByUsername(username);
    const emailExists = await User.findByEmail(email);
    if (userExists) return res.status(400).json({ msg: 'El usuario ya existe' });
    if (emailExists) return res.status(400).json({ msg: 'El correo ya está registrado' });

    await User.create(username, email, password);
    res.status(201).json({ msg: 'Usuario creado' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'El usuario o correo ya existe' });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(400).json({ msg: 'Credenciales incorrectas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

module.exports = { register, login };
