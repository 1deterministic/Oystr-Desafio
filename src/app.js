const express = require('express');
const notification = require('./router/notification.js');
const notFound = require('./router/not-found.js');

const app = express();

// recuperar informações de formulário
app.use(express.urlencoded({extended: true}));

// definição de rotas
app.use('/notification', notification);
app.use('*', notFound);

// app separado do servidor http para facilitar os testes
module.exports = app;