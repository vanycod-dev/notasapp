import express from 'express';
import cors from 'cors';
import authRoutes from './auth/routes.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Ajusta a tu puerto frontend
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🛡️ Servidor escuchando en puerto ${PORT}`));