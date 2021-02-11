require('dotenv').config();
const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');

        if (token) {
            token = token.slice(7);

            verify(token, process.env.SECRET_KEY, (error, decoded) => {
                res.locals.id = decoded.result.id;

                if (error) {
                    res.json({
                        success: 0,
                        message: 'Invalid token',
                    });

                    return;
                }

                next();
            });
        } else {
            res.json({
                success: 0,
                message: 'Accecss denied',
            });
        }
    },
};
