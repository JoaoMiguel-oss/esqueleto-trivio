const db = require('../banco/conexao');
const bcrypt = require('bcrypt');
const { gerarIdUnico } = require('../utils/geradores'); // Reutilizando seu gerador
const { uploadParaCloudinary } = require('../services/uploadService');

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const arquivo = req.file;

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    // Verifica se email já existe
    const existe = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existe) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    // Upload da imagem (opcional)
    let photo_url = null;
    if (arquivo) {
      try {
        photo_url = await uploadParaCloudinary(arquivo.buffer);
      } catch (uploadErr) {
        return res.status(500).json({ erro: 'Falha no upload da imagem' });
      }
    }

    // Preparação dos dados
    const public_id = gerarIdUnico();
    const password_hash = await bcrypt.hash(senha, 10);

    // Inserção no banco
    const stmt = db.prepare(`
      INSERT INTO users (public_id, name, email, password_hash, photo_url)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run(public_id, nome, email, password_hash, photo_url);

    // Retorno (MVP)
    res.status(201).json({
      public_id,
      nome,
      email,
      photo_url
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno ao criar usuário' });
  }
};

const uploadImagemAvulsa = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const url = await uploadParaCloudinary(req.file.buffer);
    res.status(200).json({ url });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao fazer upload' });
  }
};

const atualizarFotoPerfil = async (req, res) => {
  try {
    const { id } = req.params; // Espera o public_id
    const arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ erro: 'Nenhuma imagem enviada' });
    }

    // Verifica se usuário existe (busca pelo public_id)
    const usuario = db.prepare('SELECT id FROM users WHERE public_id = ?').get(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const photo_url = await uploadParaCloudinary(arquivo.buffer);

    const stmt = db.prepare('UPDATE users SET photo_url = ? WHERE public_id = ?');
    stmt.run(photo_url, id);

    res.status(200).json({ photo_url });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar foto de perfil' });
  }
};

module.exports = {
  criarUsuario,
  uploadImagemAvulsa,
  atualizarFotoPerfil
};