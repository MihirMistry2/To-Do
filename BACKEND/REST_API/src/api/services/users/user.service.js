const connection = require('../../../db/database');

module.exports = {
    createUser: (data, callBack) => {
        connection.query(
            `insert into users(name, email, password) values(?, ?, ?)`,
            [data.name, data.email, data.password],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },

    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `select id,email,password from users where email = ?`,
                [email],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results[0]);
                    }
                }
            );
        });
        // connection.query(
        //     `select id,email,password from users where email = ?`,
        //     [email],
        //     (error, results, fields) => {
        //         if (error) {
        //             return callBack(error);
        //         }
        //         return callBack(null, results[0]);
        //     }
        // );
    },
};
