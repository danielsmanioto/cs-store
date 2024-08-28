# Projeto CS

Bem-vindo ao repositório do projeto **CS-Store**, que contém três subprojetos principais:
Objetivo deste projeto é simular a arquitetura de uma loja que em breve aceitará vendas online e uma espectativa de escala diária.

# Desenho de arquitetura

![Uploading image.png…]()

# Desenho de arquitetura compartilhado 

https://excalidraw.com/#json=1dIJ_g3Rxwecd5zM5lDAc,lQZjDzDfJTg5rXZAPeOs8w 

- **CS-Auth**: Serviço de autenticação.
- **CS-Marketplace-Web**: Aplicação web do marketplace.
- **CS-Produtos-Node-API**: API de produtos desenvolvida em Node.js.

## Estrutura do Repositório

```
.
├── cs-auth
├── cs-marketplace-web
└── cs-produtos-node-api
```

# CS-Auth
O CS-Auth é responsável pela autenticação dos usuários dentro do ecossistema do projeto CS. Ele gerencia o login, logout e a criação de contas de usuários.

# Tecnologias Utilizadas
- Node.js: Plataforma de desenvolvimento.
- JWT: Para autenticação baseada em tokens.
- Como Rodar : Verifique o readme da pasta auth

# CS-Marketplace-Web
O CS-Marketplace-Web é a interface do usuário para o marketplace, onde os usuários podem navegar e comprar produtos.

# Tecnologias Utilizadas
- Javascript: Framework de front-end.
- Como Rodar : Verifique o readme da pasta cs-marketplace

# CS-Produtos-Node-API
A CS-Produtos-Node-API é uma API RESTful responsável por gerenciar os produtos disponíveis no marketplace.

# Tecnologias Utilizadas
- Node.js: Plataforma de desenvolvimento.
- MongoDB: Banco de dados NoSQL.
- Como Rodar : Verifique o readme da pasta cs-produtos-node-api
  
# Contribuindo
Para contribuir com este projeto, siga os passos abaixo:

# Fork o repositório.
- Crie uma nova branch (git checkout -b feature/nova-feature).
- Commit suas mudanças (git commit -am 'Adiciona nova feature').
- Faça o push para a branch (git push origin feature/nova-feature).
- Abra um Pull Request.

# Como subir todas as aplicacoes 

# 1. pre requisitos

1. Instalar o docker na maquina 
2. Iniciar o servico do docker ou docker desktop na maquina
3. Instalar o dbeaver 
4. Instalar o mongo db express

# 2. Subir todos os containers 

`./build.sh`


# 3. verificar se porta esta sendo usada e matar processo

1. Mac

`lsof -i :3000`
`kill -9 <PID>`

2. Windows 

`netstat -ano | findstr :3000`
`taskkill /PID <PID> /F`

# 9. Parar todos os containers 

`./stop.sh`



