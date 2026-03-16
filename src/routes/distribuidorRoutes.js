import { Router } from 'express';
import { DistribuidorController } from '../controllers/distribuidorController.js';

const router = Router();

// Ruta para ver la lista (GET)
router.get('/', DistribuidorController.listar);

// Tu ruta de registro de siempre (POST)
router.post('/', DistribuidorController.registrar);

export default router;