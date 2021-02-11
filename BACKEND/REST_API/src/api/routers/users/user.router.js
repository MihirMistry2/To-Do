const router = require('express').Router();

const {
    registration,
    login,
} = require('../../controllers/users/user.controller');

router.post('/login', login);
router.post('/', registration);

module.exports = router;
