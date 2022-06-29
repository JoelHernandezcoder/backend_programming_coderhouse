require('dotenv').config();
const logger = require('./utils/logger.js');

logger.info(process.argv);

const Server = require('./models/Server');
const server = new Server();

