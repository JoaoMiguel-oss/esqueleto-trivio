// rotas de autenticação
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../banco/conexao');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ 
      sucesso: false,
      mensagem: 'Nome, email e senha são obrigatórios' 
    });
  }

  try {
    const usuarioExiste = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
    
    if (usuarioExiste) {
      return res.status(400).json({ 
        sucesso: false,
        mensagem: 'Email já cadastrado' 
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    
    const resultado = db.prepare(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'
    ).run(nome, email, senhaHash);

    res.status(201).json({ 
      sucesso: true,
      mensagem: 'Usuário cadastrado com sucesso',
      dados: {
        id: resultado.lastInsertRowid,
        nome,
        email
      }
    });
  } catch (erro) {
    res.status(500).json({ 
      sucesso: false,
      mensagem: 'Erro ao cadastrar usuário' 
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ 
      sucesso: false,
      mensagem: 'Email e senha são obrigatórios' 
    });
  }

  try {
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);

    if (!usuario) {
      return res.status(401).json({ 
        sucesso: false,
        mensagem: 'Email ou senha incorretos' 
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ 
        sucesso: false,
        mensagem: 'Email ou senha incorretos' 
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      dados: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    res.status(500).json({ 
      sucesso: false,
      mensagem: 'Erro ao fazer login' 
    });
  }
});

module.exports = router;