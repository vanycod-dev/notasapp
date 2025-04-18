const connection = require('./db');
const bcrypt = require('bcryptjs');

// Creando usuario
const user = {
    create: async (usuario, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)',
                [usuario, email, hashedPassword],
                (error, results) => {
                    if (error) {
                        console.error('⚠️ Error al crear el usuario ❌:', error);
                        return reject(error);
                    }
                    console.log('✅ Usuario creado exitosamente 🛫');
                    resolve(results.insertId);
                }
            );
        });
    },
    // Verificando si el usuario existe
    finByUsername: (usuario) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM usuarios WHERE usuario = ?',
                [usuario],
                (error, results) => {
                    if (error) {
                        console.error('⚠️ Error al buscar el usuario ❌:', error);
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });
    },
    // Verificando si el email existe
    finByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM usuarios WHERE email = ?',
                [email],
                (error, results) => {
                    if (error) {
                        console.error('⚠️ Error al buscar el usuario ❌:', error);
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });
    },
}
module.exports = user;