const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/autenticarToken.js');

let agendamentos = [];
let contadorId = 1;

router.get('/', (req, res) => {
  res.status(200).json(agendamentos);
});

router.post('/', autenticar, (req, res) => {
  const { idanimal, idservico, data } = req.body;

  if (!idanimal || !idservico || !data) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const novoAgendamento = {
    id: contadorId++,
    idanimal,
    idservico,
    data
  };

  agendamentos.push(novoAgendamento);
  res.status(201).json(novoAgendamento);
});

router.delete('/:id', autenticar, (req, res) => {
  const id = parseInt(req.params.id);
  const index = agendamentos.findIndex(ag => ag.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Agendamento não encontrado' });
  }

  agendamentos.splice(index, 1);
  res.status(200).json({ mensagem: 'Agendamento cancelado com sucesso!' });
});

module.exports = router;
