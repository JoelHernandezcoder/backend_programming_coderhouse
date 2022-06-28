const express = require('express');
const { fork } = require('child_process');

const router = express.Router();
let calculation = fork('./utils/calculate.js');

router.get('/', (req, res) => {
  const { cant = 10000 } = req.query;
  calculation.on('message', (result) => {
    console.log(result);
    res.status(200).send({ result });
    calculation.kill();
    calculation = fork('./utils/calculate.js');
  });
  calculation.send(cant);
});

module.exports = router;
