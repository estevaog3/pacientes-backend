const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "test_db",
  user: "test_user",
  password: "password",
  port: "5432",
});

module.exports = pool;
