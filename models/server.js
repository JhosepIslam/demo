const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port =  process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  routes() {
    this.app.use('/api/users', require('../routes/users'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }

  middlewares () {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  async dbConnection() {
    await dbConnection();
  }
}



module.exports = Server;
