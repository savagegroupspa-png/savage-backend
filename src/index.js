const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db.js');
const fanRoutes = require('./routes/fanRoutes.js');
const distribuidorRoutes = require('./routes/distribuidorRoutes.js');
const { swaggerUi, swaggerSpec } = require('./config/swagger.js');

// Configuración de variables de entorno
dotenv.config();

const app = express();

// --- CONFIGURACIÓN DE CORS (SOLUCIÓN AL ERROR) ---
app.use(cors({
  origin: '*', // Permite peticiones desde cualquier lugar (Astro, Swagger, Localhost)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para leer JSON
app.use(express.json());

// Conexión a la base de datos
conectarDB();

// Rutas de la API
app.use('/api/fans', fanRoutes);
app.use('/api/distribuidores', distribuidorRoutes);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de prueba para verificar que el backend está vivo
app.get('/', (req, res) => {
  res.send('🚀 Servidor Savage operando al 100%');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Savage corriendo en el puerto ${PORT}`);
  console.log(`📖 Documentación disponible en http://localhost:${PORT}/api-docs`);
});
