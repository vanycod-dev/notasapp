const connection = require('../models/db');

const Note = {
  create: (usuario_id, titulo, contenido) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO notas (usuario_id, titulo, contenido) VALUES (?, ?, ?)';
      connection.query(sql, [usuario_id, titulo, contenido], (error, results) => {
        if (error) return reject(error);
        resolve({ id: results.insertId, titulo, contenido });
      });
    });
  },
  getAll: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM notas WHERE usuario_id = ?';
      connection.query(sql, [usuario_id], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
  update: (note_id, titulo, contenido) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE notas SET titulo = ?, contenido = ? WHERE id = ?';
      connection.query(sql, [titulo, contenido, note_id], (error, results) => {
        if (error) return reject(error);
        resolve(results.affectedRows);
      });
    });
  },
  delete: (note_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM notas WHERE id = ?';
      connection.query(sql, [note_id], (error, results) => {
        if (error) return reject(error);
        resolve(results.affectedRows);
      });
    });
  }
};

module.exports = Note;