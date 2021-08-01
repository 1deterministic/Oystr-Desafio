# Microsserviço de notificação de eventos
#### Lucas Fernandes Vieira
#### https://github.com/1deterministic
#### https://linkedin.com/1deterministic

## Pergunta: which HTTP response code is most suitable for this endpoint in case of a valid payload? Why?
O código de resposta mais apropriado é o 202 (Accepted), uma vez que o processamento da requisição - o envio da webhook - é de responsabilidade do serviço de notificação e ao o cliente basta saber que a requisição foi entendida corretamente e será processada em seguida.