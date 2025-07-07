const app = require('./app');



const rotaUsuarios = require('./routes/usuarios.js');

console.log('rotaUsuarios:', rotaUsuarios); // Adicione esta linha!



app.use('/usuarios', rotaUsuarios);



const PORT = 3000;

app.listen(PORT, () => {

  console.log(`Servidor rodando em http://localhost:${PORT}`);

});