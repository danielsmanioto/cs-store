#!/bin/bash

# Encontre o PID do processo usando a porta 3000
PID=$(lsof -t -i :3000)

# Verifique se o PID foi encontrado
if [ -n "$PID" ]; then
    echo "Encontrado processo com PID $PID usando a porta 3000."
    echo "Matando o processo..."
    kill -9 $PID
    echo "Processo $PID terminado."
else
    echo "Nenhum processo encontrado usando a porta 3000."
fi
