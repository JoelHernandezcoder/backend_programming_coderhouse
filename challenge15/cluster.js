const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Server = require('./models/Server');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const PORT = parseInt(process.argv[2]) || 8080;
  try {
    const server = new Server(PORT);
    server.listen();
  } catch (error) {
    console.log(`error ${error}`);
  }
}
