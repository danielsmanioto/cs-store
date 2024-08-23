const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'produtosdb',
    password: 'example',
    port: 5432
});

app.use(express.json());
app.use(cors());

// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: "Nenhum token fornecido!" });
  }

  jwt.verify(token, 'supersecretkey', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Adicione o middleware verificarToken nas rotas que você deseja proteger
app.get('/produtos', verificarToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao obter produtos', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/produtos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Erro ao obter produto por ID', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/produtos', verificarToken, async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *', [nome, preco]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar produto', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.put('/produtos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    const { rowCount } = await pool.query('UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3', [nome, preco, id]);
    if (rowCount === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  } catch (err) {
    console.error('Erro ao atualizar produto', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});