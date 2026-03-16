import { Router } from 'express';
import { FanController } from '../controllers/fanController.js'; // Con las llaves { }

const router = Router();

// Aquí es donde daba el error si FanController.listar no existía
router.get('/', FanController.listar); 
router.post('/', FanController.registrar);

export default router;