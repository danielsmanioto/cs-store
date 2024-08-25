const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Certifique-se de que as funções estão disponíveis e não são undefined
console.log('Controller methods:', authController);

// Rota para registro
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

// Rota heatch
router.get('/health', authController.health);

module.exports = router;
