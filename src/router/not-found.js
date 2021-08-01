const express = require('express');
const controller = require('../controller/not-found.js');

const router = express.Router();

// todas as requisições não identificadas são enviadas para o controller not-found
router.use('*', controller.default);

module.exports = router;