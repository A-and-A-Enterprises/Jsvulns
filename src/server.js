const express = require('express');
const databases = require('./database/database');
const API = require('./api');

const version = require('../package.json').version;

module.exports = class Server {

  constructor() {
    this.app = express();

    this.app.get('/', (req, res) => {
      res.send(`Bookstore backend ${version}`);
    });
  }

  async initialize() {
    const database = await databases.getDatabase();
    const api = new API(database);
    api.register(this.app);
  }

  start() {
    const port = process.env.port || 3000;
    this.server = this.app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  }

  stop() {
    if (this.server) {
      console.log(`Shutting down server...`);
      this.server.close();
    }
    console.log(`done`);
  }
}
