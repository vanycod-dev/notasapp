DROP DATABASE IF EXISTS notas_db;
CREATE DATABASE notas_db;
USE notas_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    username VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
select * from users;
select * from notes;
SELECT * FROM usuarios WHERE email = 'alexis@example.com';
-- DELIMITER ;

   -- Puedes crear triggers para diferentes momentos:
--    BEFORE INSERT  -- Antes de insertar
--    AFTER INSERT   -- Después de insertar
--    BEFORE UPDATE  -- Antes de actualizar
--    AFTER UPDATE   -- Después de actualizar
--    BEFORE DELETE  -- Antes de eliminar
--    AFTER DELETE   -- Después de eliminar

-- users: Almacena los usuarios registrados.
-- notes: Almacena las notas, relacionándolas con user_id.
-- is_public define si la nota es pública o privada.
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE: Si un usuario se elimina, sus notas también se eliminan automáticamente.