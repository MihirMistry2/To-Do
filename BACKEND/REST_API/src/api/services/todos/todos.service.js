const connection = require('../../../db/database');

module.exports = {
    createTodoList: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `insert into todos(user_id, description, is_done) values(?, ?, ?)`,
                [data.user_id, data.description, data.done],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results);
                    }
                }
            );
        });
    },

    updateTodoList: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `update todos set user_id = ?, description = ?, is_done = ? where user_id = ? and id = ?`,
                [
                    data.user_id,
                    data.description,
                    data.done,
                    data.user_id,
                    data.id,
                ],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results);
                    }
                }
            );
        });
    },

    deleteTodoList: (id, user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `delete from todos where id = ? and user_id = ?`,
                [id, user_id],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results);
                    }
                }
            );
        });
    },

    getTodoListById: (user_id, id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `select * from todos where user_id = ? and id = ?`,
                [user_id, id],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results);
                    }
                }
            );
        });
    },

    getAllTodosList: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `select * from todos where user_id = ?`,
                [id],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results);
                    }
                }
            );
        });
    },
};
