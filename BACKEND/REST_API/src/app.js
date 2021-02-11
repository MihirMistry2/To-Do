require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRouters = require('./api/routers/users/user.router');
const todoRouters = require('./api/routers/todos/todo.router');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT',
            'POST',
            'PATCH',
            'DELETE',
            'GET',
            'POST'
        );
        return res.status(200).json({});
    }

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRouters);
app.use('/api/todos', todoRouters);

app.use('*', (req, res, next) => {
    res.status(404);
    res.redirect('/pagenotfound');
});

module.exports = app;
