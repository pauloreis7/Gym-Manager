const { Pool } = require('pg')

module.exports = new Pool ({
    user: "paulo",
    password: "depajo1107",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})