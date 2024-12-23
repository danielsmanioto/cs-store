const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
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

// Definir a rota de healthcheck antes das outras rotas
app.get('/produtos/healthcheck', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

app.get('/produtos', verificarToken, async (req, res) => {
  let { page = 1, limit = 10, search = '' } = req.query;

  // Converte page e limit para inteiros
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const offset = (page - 1) * limit;

  try {
    // Base das consultas SQL
    let query = 'SELECT * FROM produtos';
    let countQuery = 'SELECT COUNT(*) FROM produtos';
    const queryParams = [];
    const countQueryParams = [];

    // Adiciona o filtro de nome, se fornecido
    if (search != '') {
      query += ' WHERE nome ILIKE $1';
      countQuery += ' WHERE nome ILIKE $1';
      queryParams.push(`%${search}%`);
      countQueryParams.push(`%${search}%`);

      query += ' ORDER BY id LIMIT $2 OFFSET $3';
      queryParams.push(limit, offset);
    } else {
      query += ' ORDER BY id LIMIT $1 OFFSET $2';
      queryParams.push(limit, offset);
    }

    // Executa a consulta para obter produtos
    const { rows } = await pool.query(query, queryParams);

    // Executa a consulta para contar o total de produtos
    const countResult = await pool.query(countQuery, countQueryParams.length ? countQueryParams : undefined);
    const count = parseInt(countResult.rows[0].count, 10);

    res.json({
      produtos: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error('Erro ao obter produtos:', err.message, err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/produtos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao obter produto', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/produtos', verificarToken, async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *',
      [nome, preco]
    );
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
    const { rows } = await pool.query(
      'UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *',
      [nome, preco, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar produto', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/produtos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Erro ao excluir produto', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
