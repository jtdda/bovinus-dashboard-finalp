const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Conecta ao banco de dados (cria o arquivo se não existir)
const db = new sqlite3.Database('./bovinus.db');

// Cria a tabela de itens do buffet e insere dados iniciais
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS buffet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    pesoAtual REAL,
    capacidade REAL,
    status TEXT
  )`);

  // Insere os dados iniciais (Picanha vazia)
  db.get("SELECT COUNT(*) as count FROM buffet", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO buffet (nome, pesoAtual, capacidade, status) VALUES 
        ('Picanha', 0.2, 5.0, 'vazio'),
        ('Arroz Branco', 1.5, 5.0, 'baixo'),
        ('Salada Caesar', 3.0, 5.0, 'cheio')
      `);
    }
  });
});

// ROTA 1: Listar todos os itens do buffet
app.get('/api/buffet', (req, res) => {
  db.all("SELECT * FROM buffet", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ROTA 2: Repor um item (atualiza o peso para a capacidade máxima)
app.put('/api/buffet/:id/repor', (req, res) => {
  const { id } = req.params;
  db.run("UPDATE buffet SET pesoAtual = capacidade, status = 'cheio' WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Reposto com sucesso", id: id });
  });
});

// Inicia o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend Bovinu'S rodando na porta ${PORT}`);
});