import mongoose from 'mongoose';

const distribuidorSchema = new mongoose.Schema({
    nombre: String,
    empresa: String,
    ciudad: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
},{ bufferCommands: false });

const Distribuidor = mongoose.model('Distribuidor', distribuidorSchema);

export const distribuidorRepository = {
    async guardar(datos) {
        const nuevo = new Distribuidor(datos);
        return await nuevo.save();
    },
    // --- ESTO ES LO NUEVO ---
    async obtenerTodos() {
        return await Distribuidor.find().sort({ fecha: -1 }); // Trae todos, el más nuevo primero
    }
};