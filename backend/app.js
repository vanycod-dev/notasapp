const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} 🛫`);
});