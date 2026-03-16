import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// IMPORTANTE: Asegúrate de que diga "export const conectarDB"
export const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`🔥 Base de datos conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error al conectar a la base de datos: ${error.message}`);
        process.exit(1); // Detiene el proceso si hay error
    }
};