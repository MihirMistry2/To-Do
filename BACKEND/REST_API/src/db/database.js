require('dotenv').config;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

const queryArrays = [
    `create table if not exists users(
        id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT current_timestamp(),
        updated_at timestamp NOT NULL DEFAULT current_timestamp()
    )`,

    `create table if not exists todos(
        id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id int(11) NOT NULL,
        description varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT current_timestamp(),
        updated_at timestamp NOT NULL DEFAULT current_timestamp(),
        CONSTRAINT FK_todos FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`,
];

connection.connect((err) => {
    if (err) {
        return console.log('error: ' + err.message);
    }

    for (let queryArray of queryArrays) {
        connection.query(queryArray, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }

    console.log('Connected to the MySQL server.');
});

module.exports = connection;
