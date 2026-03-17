const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // Usamos la variable de entorno para la conexión
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("La variable MONGODB_URI no está definida");
    }
    
    await mongoose.connect(uri);
    console.log('✅ MongoDB Conectado con éxito');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

// ESTA ES LA LÍNEA CLAVE: Exportar la función tal cual
module.exports = conectarDB;
