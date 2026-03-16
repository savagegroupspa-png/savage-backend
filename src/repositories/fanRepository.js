import mongoose from 'mongoose';

const fanSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Fan = mongoose.model('Fan', fanSchema);

export const fanRepository = {
    async guardar(datos) {
        const nuevoFan = new Fan(datos);
        return await nuevoFan.save();
    },
    async obtenerTodos() {
        return await Fan.find().sort({ fecha: -1 });
    }
};