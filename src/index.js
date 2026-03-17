const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/db');
const { swaggerDocs } = require('./config/swagger');

// Importar rutas
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const fanRoutes = require('./routes/fanRoutes');

const app = express();

// 1. Conectar a la base de datos (Solo una vez)
conectarDB();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Rutas y Redirección
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api/distribuidores', distribuidorRoutes);
app.use('/api/fans', fanRoutes);

// 4. Configuración de Swagger
swaggerDocs(app);

// 5. Servidor (Configurado para Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Savage corriendo en puerto ${PORT}`);
  console.log(`📄 Documentación disponible en /api-docs`);
});
