#!/bin/bash

# Parar todos os containers ativos
docker stop $(docker ps -q)

# Mensagem de sucesso
echo "Todos os containers foram parados com sucesso!"

# Entrar na pasta cs-auth e executar o comando Docker Compose
cd cs-auth
docker compose up --build -d

# Voltar para a pasta anterior
cd ..

# Entrar na pasta cs-marketplace-web e executar o comando Docker Compose
cd cs-marketplace-web
docker compose up --build -d

# Voltar para a pasta anterior
cd ..

# Entrar na pasta cs-produtos-node-api e executar o comando Docker Compose
cd cs-produtos-node-api
docker compose up --build -d

# Entrar na pasta src e executar o comando para subir o Node.js
cd src
node app.js

# Voltar para a pasta anterior
cd ..

# Executar o comando docker ps para mostrar os containers ativos
docker ps

# Mensagem de sucesso
echo "Processo concluído com sucesso!"
