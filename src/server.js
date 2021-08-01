// a execução pode ser configurada com as seguintes variáveis de ambiente:
// PORT (padrão 3000)
// WEBHOOKURL (padrão https://webhook.site/3949cc72-c318-4328-9f5f-4f661170f9db)

// templates para testar via curl (assumindo que a porta seja 3000)
// curl --verbose 'http://localhost:3000/notification' --request POST --data 'evt=ExecutionFinishedWithError&execution=20201015.111226-ij0uxv&owner=56&bot=pje-trt-copia-integral' && echo # payload 1
// curl --verbose 'http://localhost:3000/notification' --request POST --data 'evt=ReportGenerated&execution=20201015.111226-ij0uxv&owner=56&bot=pje-trt-copia-integral' && echo # payload 2

const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

// callback em caso de erro (porta em uso ou reservada, por exemplo)
server.on('error', (error) => {
    return console.log(`Ocorreu um erro: ${error.message}`);
});

// exibir o endereço ao iniciar
server.on('listening', () => {
    return console.log(`Servidor iniciado em localhost:${port}`);
});

server.listen(port);