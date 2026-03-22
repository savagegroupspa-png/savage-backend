const mongoose =  require('mongoose');

const fanSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Fan = mongoose.model('Fan', fanSchema);

const fanRepository = {
    async guardar(datos) {
        const nuevoFan = new Fan(datos);
        return await nuevoFan.save();
    },
    async obtenerTodos() {
        return await Fan.find().sort({ fecha: -1 });
    }
};

// Exportación en formato CommonJS
module.exports = { fanRepository };
