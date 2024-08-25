#!/bin/bash

# Parar todos os containers ativos
docker stop $(docker ps -q)

# Mensagem de sucesso
echo "Todos os containers foram parados com sucesso!"
