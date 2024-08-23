# Definindo a imagem base
FROM node:16

# Configura o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo vai rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["node", "src/app.js"]
