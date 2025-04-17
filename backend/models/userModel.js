const pool = require('./db');

// Crear usuario
const crearUsuario = async (usuario, email, password) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios  (usuario, email, password) values (?, ?, ?)',
        [usuario, email, password]
    );
    return result.insertId;
}

// Buscar usuario

const getUsuario = async (usuario) => {
    const [result] = await pool.query(
        'SELECT * FROM usuario WHERE usuario = ?',
        [usuario]
    );
    return result;
}


module.exports = {
  crearUsuario,
  getUsuario
};