const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'meusegredosecreto'; // Em produção, use .env

// Banco de dados em memória
const usuarios = [];

function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  const existe = usuarios.find(user => user.email === email);
  if (existe) {
    return res.status(409).json({ erro: 'Usuário já cadastrado' });
  }

  const senhaHash = bcrypt.hashSync(senha, 8);
  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: senhaHash
  };

  usuarios.push(novoUsuario);

  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
}

function login(req, res) {
  const { email, senha } = req.body;

  const usuario = usuarios.find(user => user.email === email);
  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário não encontrado' });
  }

  const senhaValida = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ erro: 'Senha inválida' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    mensagem: 'Login realizado com sucesso',
    token
  });
}

module.exports = {
  cadastrarUsuario,
  login,
  SECRET_KEY // ⚠️ usado no autenticarToken.js
};
