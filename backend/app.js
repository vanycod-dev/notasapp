const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Middleware de errores (NUEVO)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    data: null
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});