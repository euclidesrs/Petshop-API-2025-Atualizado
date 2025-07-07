const express = require('express');
const app = express();

const animais = require('./routes/animais.js');
const servicos = require('./routes/servicos.js');
const agendamentos = require('./routes/agendamento.js');
const usuarios = require('./routes/usuarios.js');


app.use(express.json());

app.use('/animais', animais);
app.use('/servicos', servicos);
app.use('/agendamentos', agendamentos);
app.use('/usuarios', usuarios);

module.exports = app;
