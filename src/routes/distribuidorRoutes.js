const express = require('express');
const router = express.Router();
const { DistribuidorController } = require('../controllers/distribuidorController.js');

// Ruta para ver la lista (GET)
router.get('/', DistribuidorController.listar);

// Tu ruta de registro de siempre (POST)
router.post('/', DistribuidorController.registrar);

module.exports = router;