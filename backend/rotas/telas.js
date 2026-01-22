// rotas de telas
const express = require('express');
const verificarAutenticacao = require('../middlewares/verificarAutenticacao');

const router = express.Router();

router.get('/introducao', (req, res) => {
  res.status(200).json({ 
    sucesso: true,
    tela: 'introducao',
    dados: {
      titulo: 'Bem-vindo ao Trivio',
      descricao: 'Seu aplicativo de conhecimento'
    }
  });
});

router.get('/principal', verificarAutenticacao, (req, res) => {
  res.status(200).json({ 
    sucesso: true,
    tela: 'principal',
    dados: {
      titulo: 'Tela Principal'
    }
  });
});

router.get('/configuracoes', verificarAutenticacao, (req, res) => {
  res.status(200).json({ 
    sucesso: true,
    tela: 'configuracoes',
    dados: {
      titulo: 'Configurações'
    }
  });
});

module.exports = router;