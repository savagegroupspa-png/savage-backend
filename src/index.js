const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const conectarDB = require('./config/db.js'); // <-- ¡AQUÍ ESTÁ LA CORRECCIÓN!
const { swaggerUi, swaggerSpec } = require('./config/swagger.js');


const app = express();

app.use(cors({
  origin: ['https://drinkssavage.com', 'https://www.drinkssavage.com','http://localhost:4321','http://localhost:3000']
}));
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Rutas (Asegúrate de que estos archivos existan en src/routes/)
app.use('/api/fans', require('./routes/fanRoutes.js'));
app.use('/api/distribuidores', require('./routes/distribuidorRoutes.js'));

// LA RUTA MÁGICA: Aquí es donde se activa el link
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send('🚀 Servidor Savage operando'));

const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Savage corriendo en puerto ${PORT}`);
});
