const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conectarDB = async () => {
    try {
        // Asegúrate de que en tu Panel de Render tengas la variable MONGODB_URI
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`🔥 Base de datos conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error al conectar a la base de datos: ${error.message}`);
        process.exit(1); 
    }
};

// Exportamos como un objeto para que coincida con la importación en index.js
module.exports = { conectarDB };
