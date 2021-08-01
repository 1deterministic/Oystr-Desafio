const axios = require('axios');

// pode ser modificada via variável de ambiente
const webHookUrl = process.env.WEBHOOKURL || 'https://webhook.site/3949cc72-c318-4328-9f5f-4f661170f9db';

module.exports = {
    create: (request, response, next) => {
        // eventos de erro possíveis
        const errorEvents = [
            'ExecutionFinishedWithError'
        ];

        // rejeitar requisição inválida ou incompleta imediatamente
        if (
            !request.body ||
            !request.body.evt ||
            !request.body.execution ||
            !request.body.owner ||
            !request.body.bot
        ) {
            console.log('[Invalid] notificação inválida ou incompleta recebida.');
            return response.status(400).send();
        }

        // enviar webhook e exibir mensagem de log no terminal
        var notification = `[${request.body.evt} - ${request.body.bot}] a execução ${request.body.execution} terminou com ${(errorEvents.includes(request.body.evt) ? "erros" : "sucesso")}.`;        

        axios({
            method: 'post',
            url: webHookUrl,
            timeout: 3000
        }, {
            notification: notification
        }).then((response) => {
            return console.log(`[WebHookSuccess] o envio da webhook ${request.body.execution} foi bem sucedido.`);
        }).catch((error) => {
            // recebeu erro
            if (error.response) {
                return console.log(`[WebHookError] o envio da webhook ${request.body.execution} falhou com status: ${error.response}.`);
            // não recebeu resposta
            } else if (error.request) {
                return console.log(`[WebHookError] o envio da webhook ${request.body.execution} não recebeu resposta de ${webHookUrl}.`);
            }
            // qualquer outro problema
            return console.log(`[WebHookError] o envio da webhook ${request.body.execution} falhou com um erro desconhecido: ${error}.`);
        });
        
        // a mensagem será exibida e a resposta da requisição enviada independentemente do retorno da webhook
        console.log(notification);
        return response.status(204).send();
    }
};