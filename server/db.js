const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Pa$$w0rdM013",
    database: "dwmorgan_db",
    host: "localhost",
    port: 5432
});

module.exports = pool;