import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/db';

const JWT_SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // 1. Verificar si el usuario existe
        const [usuario] = await pool.query(
            'SELECT id FROM usuarios WHERE email = ?', 
            [email]
        );

        if (usuario.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // 2. Encriptar contraseña (¡nunca guardes texto plano!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear usuario
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        // 4. Generar token JWT
        const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { 
            expiresIn: '1h' 
        });

        res.status(201).json({ token });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar usuario
        const [usuarios] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?', 
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const usuario = usuarios[0];

        // 2. Validar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // 3. Generar token
        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { 
            expiresIn: '1h' 
        });

        res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre } });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};