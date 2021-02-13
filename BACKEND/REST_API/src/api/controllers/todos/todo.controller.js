const { request } = require('express');
const {
    getAllTodosList,
    getTodoListById,
    createTodoList,
    updateTodoList,
    deleteTodoList,
} = require('../../services/todos/todos.service');

const getTodoList = async (id) => {
    try {
        return await getAllTodosList(id);
    } catch (e) {
        return 'Something went wrong';
    }
};

module.exports = {
    createTodos: async (req, res, next) => {
        try {
            const body = req.body;
            body.user_id = res.locals.id;
            const createdResult = await createTodoList(body);

            if (Promise.resolve(createdResult)) {
                if (createdResult.affectedRows === 0) {
                    throw 'Todo not created';
                }

                if (createdResult.affectedRows > 0) {
                    const results = await getTodoList(body.user_id);

                    if (!results || results.length === 0) {
                        throw 'No record';
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'Todos created successfuly',
                        data: results,
                    });
                }
            }
        } catch (e) {
            return res.status(500).json({
                success: 0,
                data: e,
            });
        }
    },

    updateTodos: async (req, res, next) => {
        try {
            const body = req.body;
            body.id = req.params.id;
            body.user_id = res.locals.id;
            const updatedResult = await updateTodoList(body);

            if (Promise.resolve(updatedResult)) {
                if (updatedResult.affectedRows === 0) {
                    throw 'there is no record which you are looking for';
                }

                if (updatedResult.affectedRows > 0) {
                    const results = await getTodoList(body.user_id);

                    if (!results || results.length === 0) {
                        throw 'No record';
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'Todos updated successfuly',
                        data: results,
                    });
                }
            }

            if (Promise.reject(updatedResult)) {
                throw 'Database connection error';
            }
        } catch (e) {
            return res.status(500).json({
                success: 0,
                data: e,
            });
        }
    },

    deleteTodos: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user_id = res.locals.id;
            const deletedResult = await deleteTodoList(id, user_id);

            if (Promise.resolve(deletedResult)) {
                if (deletedResult.affectedRows === 0) {
                    throw 'there is no record which you are looking for';
                }

                if (deletedResult.affectedRows > 0) {
                    const results = await getTodoList(user_id);

                    if (!results || results.length === 0) {
                        throw 'No record';
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'Todos deleted successfuly',
                        data: results,
                    });
                }
            }

            if (Promise.reject(deletedResult)) {
                throw 'Database connection error';
            }
        } catch (e) {
            return res.status(500).json({
                success: 0,
                data: e,
            });
        }
    },

    getTodos: async (req, res, next) => {
        try {
            const user_id = res.locals.id;
            const results = await getTodoList(user_id);

            if (Promise.resolve(results)) {
                if (!results || results.length === 0) {
                    throw 'No record';
                }

                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

            if (Promise.reject(results)) {
                throw 'Database connection error';
            }
        } catch (e) {
            if (e === 'No record') {
                return res.status(404).json({
                    success: 0,
                    data: e,
                });
            }

            return res.status(500).json({
                success: 0,
                data: e,
            });
        }
    },

    getTodoById: async (req, res, next) => {
        try {
            const user_id = res.locals.id;
            const id = req.params.id;
            const results = await getTodoListById(user_id, id);

            if (Promise.resolve(results)) {
                if (!results || results.length === 0) {
                    throw 'No record';
                }

                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            }

            if (Promise.reject(results)) {
                throw 'Database connection error';
            }
        } catch (e) {
            return res.status(500).json({
                success: 0,
                data: e,
            });
        }
    },
};
