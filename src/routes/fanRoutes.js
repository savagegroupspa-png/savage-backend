const express = require('express');
const router = express.Router();
const { FanController } = require('../controllers/fanController.js'); 

router.get('/', FanController.listar); 
router.post('/', FanController.registrar);

module.exports = router;