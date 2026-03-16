import { fanRepository } from '../repositories/fanRepository.js';
import { enviarCorreoBienvenida } from '../utils/mailer.js';

export const FanController = {
    // 1. Función para registrar (POST)
    async registrar(req, res) {
        try {
            const resultado = await fanRepository.guardar(req.body);
            // Enviamos el correo de bienvenida
            enviarCorreoBienvenida(resultado.email, resultado.nombre);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 2. Función para listar (GET) - ¡ESTA ES LA QUE TE FALTA!
    async listar(req, res) {
        try {
            const fans = await fanRepository.obtenerTodos();
            res.json(fans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};