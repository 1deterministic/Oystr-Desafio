const express = require('express');
const controller = require('../controller/notification.js');

const router = express.Router();

// executar somente nas requisições post nessa rota, quaiquer outras cairão na not-found
router.post('', controller.create);

module.exports = router;