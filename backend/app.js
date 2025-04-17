const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});