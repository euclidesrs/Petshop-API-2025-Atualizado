const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/authController.js');

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // O console.log foi movido para cá, dentro da função
    console.log('Token recebido no middleware:', token);

    if (!token) return res.status(403).json({ erro: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, usuario) => {
        if (err) return res.status(403).json({ erro: 'Token inválido' });
        req.usuario = usuario;
        next();
    });
}

module.exports = autenticarToken;