const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });
  }
};

module.exports = User;