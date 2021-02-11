const router = require('express').Router();

const {
    getTodos,
    getTodoById,
    createTodos,
    updateTodos,
    deleteTodos,
} = require('../../controllers/todos/todo.controller');
const { checkToken } = require('../../../auth/token_validation');

router.get('/', checkToken, getTodos);
router.get('/:id', checkToken, getTodoById);
router.post('/', checkToken, createTodos);
router.put('/:id', checkToken, updateTodos);
router.delete('/:id', checkToken, deleteTodos);

module.exports = router;
