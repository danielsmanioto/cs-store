# cs-produtos-node-api

# Rodando banco
- `docker network create cs-produtos-infra-bd_default`
- `docker-compose up`
- Acessar localhost:8080 com banco de dados produtosdb
-
# criando estrutura banco de dados rodando os scripts 

# Rodando aplicacao

- `npm init -y`
- `npm install express pg`
- `npm install cors`
- `npm install jsonwebtoken`

# Subindo aplicacao
- `cs src` 
- `node app.js`

# Dados 
1. Administrando Banco de dados `localhost:8080`
2. API: 

# Documentacao API / Endpoints
- GET /produtos: Retorna todos os produtos.
- GET /produtos/:id: Retorna um produto específico pelo seu ID.
- POST /produtos: Adiciona um novo produto.
- PUT /produtos/:id: Atualiza um produto existente.

# Testando via curl
`curl http://localhost:3000/produtos`

# Testando via postman 
- Acessar colecao /colections/
