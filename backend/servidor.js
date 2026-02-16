// servidor principal
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// const rotasAutenticacao = require('./rotas/autenticacao');
// const rotasUsuario = require('./rotas/usuario');
// const rotasTelas = require('./rotas/telas');

const userRoutes = require('./routes/userRoutes');
const inicializarTabelas = require('./database/setup');

const app = express();
const porta = process.env.PORT || 3000;

app.use(helmet()); // Adiciona headers de segurança
app.use(morgan('dev')); // Loga as requisições no console
app.use(cors());
app.use(express.json());

// Inicializa tabelas do banco (MVP)
inicializarTabelas();

// Rotas da API (Prefixo /api/v1 para versionamento)
app.use('/api/v1', userRoutes);
// As rotas agora serão: /api/v1/users e /api/v1/upload

// Middleware para tratar rota não encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware global de tratamento de erros (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});