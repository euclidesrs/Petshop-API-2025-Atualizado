const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let servicos = [];

router.get('/', (req, res) => {
  res.status(200).json(servicos);
});

router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const novoServico = {
    id: uuidv4(),
    nome,
    preco,
  };

  servicos.push(novoServico);
  res.status(201).json(novoServico);
});

module.exports = router;
