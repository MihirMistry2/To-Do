require('dotenv').config();
const { hashSync, compareSync } = require('bcrypt');
const { json } = require('body-parser');
const { sign } = require('jsonwebtoken');

const {
    createUser,
    getUserByEmail,
} = require('../../services/users/user.service');
// const { getAllTodosList } = require('../../services/todos/todos.service');

module.exports = {
    registration: (req, res, next) => {
        const body = req.body;
        body.password = hashSync(body.password, 10);

        createUser(body, (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(500).json({
                        success: 0,
                        message: 'Duplicate email entry',
                    });
                } else {
                    console.log(error.code);
                    return res.status(500).json({
                        success: 0,
                        message: 'Database connection error',
                    });
                }
            }

            return res.status(200).json({
                success: 1,
                message: 'User created successfuly',
            });
        });
    },

    login: async (req, res, next) => {
        try {
            const body = req.body;
            const results = await getUserByEmail(body.email);

            if (Promise.resolve(results)) {
                if (!results || results.length === 0) {
                    throw 'Invalid email or password';
                }

                const result = compareSync(body.password, results.password);

                if (result) {
                    results.password = undefined;

                    const jsontoken = sign(
                        { result: results },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '1d',
                        }
                    );

                    return res.status(200).json({
                        success: 1,
                        token: jsontoken,
                        message: 'login successfully',
                    });

                    // const getTodos = await getAllTodosList(results.id);

                    // if (Promise.resolve(getTodos)) {
                    //     if (Array.isArray(getTodos) && getTodos.length === 0) {
                    //         return res.status(200).json({
                    //             success: 1,
                    //             token: jsontoken,
                    //             message: 'login successfully',
                    //             data: 'No todos record',
                    //         });
                    //     }
                    //     return res.status(200).json({
                    //         success: 1,
                    //         token: jsontoken,
                    //         message: 'login successfully',
                    //         data: getTodos,
                    //     });
                    // }
                } else {
                    throw 'Invalid email or password';
                }
            }

            if (Promise.reject(results)) {
                throw 'Database connection error';
            }
        } catch (e) {
            if (typeof e === 'string' && e === 'Invalid email or password') {
                return res.status(401).json({
                    success: 0,
                    message: e,
                });
            } else {
                return res.status(500).json({
                    success: 0,
                    message: e,
                });
            }
        }
    },
};
