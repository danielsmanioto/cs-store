# cs-auth

# Subindo o mongodb e aplicacao auth
1. `docker-compose up --build`

-----------------------------------------------
# Instalacao
1. `npm init -y`
2. `npm install express mongoose jsonwebtoken bcryptjs`
3. `npm install dotenv --save`
4. ` npm install cors`
5. `node src/app.js`

# 3. Rodando 
. app: porta 3001
. mongo: 
> POST `http://localhost:3001/auth/register` 
> POST `http://localhost:3001/auth/login`
. para testae via postman basta importar colecoes/colecoes.xml   

## buscando informacoes no mongodb 

. Conectar voa mongodb compas ou outro clint