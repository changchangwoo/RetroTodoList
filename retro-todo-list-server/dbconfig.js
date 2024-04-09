const mysql = require("mysql2");
require("dotenv").config()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PW,
  database: "retro-todo-list",
  dateStrings: true,
});

module.exports = connection;