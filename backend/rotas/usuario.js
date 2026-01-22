// rotas de usuário
const express = require('express');
const db = require('../banco/conexao');
const verificarAutenticacao = require('../middlewares/verificarAutenticacao');

const router = express.Router();

router.get('/verificar/:id', verificarAutenticacao, (req, res) => {
  const { id } = req.params;

  try {
    const usuario = db.prepare(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?'
    ).get(id);

    if (!usuario) {
      return res.status(404).json({ 
        sucesso: false,
        mensagem: 'Usuário não encontrado' 
      });
    }

    res.status(200).json({ 
      sucesso: true,
      dados: usuario 
    });
  } catch (erro) {
    res.status(500).json({ 
      sucesso: false,
      mensagem: 'Erro ao verificar usuário' 
    });
  }
});

module.exports = router;