// verificação de autenticação
const verificarAutenticacao = (req, res, next) => {
  const idUsuario = req.headers['id-usuario'];

  if (!idUsuario) {
    return res.status(401).json({ 
      sucesso: false,
      mensagem: 'Usuário não autenticado' 
    });
  }

  next();
};

module.exports = verificarAutenticacao;