const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();

// Configuração do Multer (Armazena na memória RAM temporariamente)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoints
router.post('/users', upload.single('imagem'), userController.criarUsuario);
router.post('/upload', upload.single('arquivo'), userController.uploadImagemAvulsa);
router.put('/users/:id/foto', upload.single('imagem'), userController.atualizarFotoPerfil);

module.exports = router;