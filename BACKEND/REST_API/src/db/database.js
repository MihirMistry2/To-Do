require('dotenv').config;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

connection.connect((err) => {
    if (err) {
        return console.log('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = connection;
