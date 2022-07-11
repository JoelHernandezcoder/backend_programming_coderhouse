class DbClient {
  async connect() {
    throw new Error("missing implement 'connect' in subclass!");
  }

  async disconnect() {
    throw new Error("missing implement 'disconnect' in subclass!");
  }
}

module.exports = DbClient;
