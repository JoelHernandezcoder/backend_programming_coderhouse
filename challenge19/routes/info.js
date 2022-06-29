const express = require('express');
const minimist = require('minimist');
const logger = require('../utils/logger.js')
const router = express.Router();

router.get('/', (req, res) => {
  const arg = minimist(process.argv.slice(2));
  let html = `<h1>SESSION INFORMATION</h1><ul>`;
  html += `<li>Input Arguments: ${JSON.stringify(arg)}</li>`;
  html += `<li>Path: ${process.cwd()}</li>`;
  html += `<li>Operating system: ${process.platform}</li>`;
  html += `<li>ID Process: ${process.pid}</li>`;
  html += `<li>Version Node: ${process.version}</li>`;
  html += `<li>Project Folder: ${process.execPath}</li>`;
  html += `<li>Total Memory Reserved (RSS): ${process.memoryUsage().rss}</li>`;
  logger.info(`Get information ${html}`);
  res.status(200).send(html);
});

module.exports = router;
