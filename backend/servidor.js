// servidor principal
const express = require('express');
const cors = require('cors');
const rotasAutenticacao = require('./rotas/autenticacao');
const rotasUsuario = require('./rotas/usuario');
const rotasTelas = require('./rotas/telas');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/autenticacao', rotasAutenticacao);
app.use('/api/usuario', rotasUsuario);
app.use('/api/telas', rotasTelas);

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});