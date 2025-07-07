const express = require('express');
const router = express.Router();
const { cadastrarUsuario, login } = require('../controllers/authController.js');

// Rota para cadastro de usuário
router.post('/cadastro', cadastrarUsuario);

// Rota para login de usuário
router.post('/login', login);

module.exports = router;
