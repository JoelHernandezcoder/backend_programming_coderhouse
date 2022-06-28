import App from './app.js';

const PORT = 8080;

(async () => {
  try {
    const server = new App(PORT);
    await server.listen();
    await server.start();
  } catch (error) {
    console.log(`error ${error}`);
  }
})();
