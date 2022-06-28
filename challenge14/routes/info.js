const express = require('express');
const minimist = require('minimist');

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
  res.status(400).send(html);
});

module.exports = router;
