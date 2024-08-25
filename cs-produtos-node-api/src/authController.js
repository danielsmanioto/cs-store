const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Supondo que o token esteja no header da requisição
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: "Nenhum token fornecido!" });
  }

  jwt.verify(token, 'supersecretkey', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }
    // Se tudo estiver ok, salva o ID do usuário no request para uso posterior
    req.userId = decoded.id;
    next();
  });
};

