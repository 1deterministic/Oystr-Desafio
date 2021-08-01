# configurar (com o terminal na mesma pasta que este arquivo)
# sudo docker build --tag notifications:latest .

# executar (será removido automaticamente ao terminar a execução)
# sudo docker run -it --rm -p 3000:3000 notifications:latest

from docker.io/fedora:34

# copiar apenas os arquivos/diretórios necessários
copy ./package.json /opt/package.json
copy ./src /opt/src
# copy ./test /opt/test

# atualizar contêiner base, instalar nodejs e npm, instalar dependências do projeto com npm
run dnf update -y && \
    dnf install nodejs npm -y && \
    cd /opt && npm install

# npm run test e npm run dev não estão disponíveis no contêiner
workdir /opt
cmd npm run start