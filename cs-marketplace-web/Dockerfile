FROM nginx:alpine

# Copiar o arquivo de configuração personalizado para o diretório de configuração do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos do diretório de construção para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Alterar as permissões dos arquivos copiados para o usuário e grupo do Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expor a porta 8089 para o tráfego da web
EXPOSE 8089

# Comando para iniciar o servidor Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]
