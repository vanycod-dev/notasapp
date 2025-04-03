const connection = require('../config/db');

const Note = {
  create: (user_id, title, content) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
        [user_id, title, content],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  getAllByUser: (user_id) => { // ✅ CORREGIDO: Se usa `user_id`
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', // ✅ Ahora usa `user_id`
        [user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Note;