// configuração do banco de dados
const Database = require('better-sqlite3');
const caminho = require('path');

const db = new Database(caminho.join(__dirname, 'trivio.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;