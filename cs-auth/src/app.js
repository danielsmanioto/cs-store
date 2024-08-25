const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB sem opções obsoletas
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Definir as rotas
app.use('/auth', authRoutes);

// Configurar e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
