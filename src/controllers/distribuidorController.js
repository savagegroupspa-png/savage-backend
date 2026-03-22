const { distribuidorRepository } = require('../repositories/distribuidorRepository.js');
const { enviarDossierComercial } = require('../utils/mailer.js'); 

const DistribuidorController = {
    // 1. Función para registrar y enviar mail
    async registrar(req, res) {
        try {
            // Extraemos los datos del cuerpo de la petición
            const { nombre, empresa, email } = req.body;
            
            // Guardamos en la base de datos
            const resultado = await distribuidorRepository.guardar(req.body);
            
            // Disparamos el correo B2B (Asegúrate que el front mande el campo "email")
            if (email) {
                enviarDossierComercial(email, nombre, empresa);
            }

            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }, // <-- ESTA COMA es vital para separar las funciones

    // 2. Función para listar todos los distribuidores
    async listar(req, res) {
        try {
            const distribuidores = await distribuidorRepository.obtenerTodos();
            res.json(distribuidores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

// Exportamos en formato CommonJS
module.exports = { DistribuidorController };
