const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/authController.js');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer <token>"

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });

    req.usuario = usuario; // Define o usuário logado
    next(); // Libera acesso à rota
  });
}

module.exports = autenticarToken;
