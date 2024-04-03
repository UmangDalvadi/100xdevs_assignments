const { User } = require('../db/index');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    User.findOne({
        username: req.headers.username,
        password: req.headers.password
    })
        .then((response) => {
            if (response) {
                next();
            } else {
                res.json({
                    message: 'User does not exists'
                })
            }
        })
}

module.exports = userMiddleware;