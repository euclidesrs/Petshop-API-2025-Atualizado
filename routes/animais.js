const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let animais = [];

router.get('/', (req, res) => {
  res.status(200).json(animais);
});

router.post('/', (req, res) => {
  const { nome, especie } = req.body;

  if (!nome || !especie) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const novoAnimal = {
    id: uuidv4(),
    nome,
    especie,
  };

  animais.push(novoAnimal);
  res.status(201).json(novoAnimal);
});

module.exports = router;
