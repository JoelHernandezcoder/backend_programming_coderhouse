const express = require('express');
const { fork } = require('child_process');
const logger = require('../utils/logger');
const router = express.Router();

let calculation = fork('./utils/calculate.js');

router.get('/', (req, res) => {
  const { quant = 10000 } = req.query;
  logger.info(`Get ramdons ${quant}`);
  calculation.on('message', (result) => {
    logger.info(result);
    res.status(200).send({ result });
    calculation.kill();
    calculation = fork('./utils/calculate.js');
  });
  calculation.send(quant);
});

module.exports = router;
