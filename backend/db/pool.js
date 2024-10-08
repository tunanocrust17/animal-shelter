const {Pool} = require('pg')

module.exports = new Pool({
    host: "localhost",
    user:process.env.DBUSER,
    database: "animal_shelter",
    password: process.env.DBWORDS,
    port: 5432
})