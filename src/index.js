const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { swaggerDocs } = require('./config/swagger');

// Importar rutas
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const fanRoutes = require('./routes/fanRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// --- REDIRECCIÓN A SWAGGER (LO NUEVO) ---
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Rutas de la API
app.use('/api/distribuidores', distribuidorRoutes);
app.use('/api/fans', fanRoutes);

// Configuración de Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Savage corriendo en puerto ${PORT}`);
  console.log(`📄 Documentación disponible en http://localhost:${PORT}/api-docs`);
});
