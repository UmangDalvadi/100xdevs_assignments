const { Admin } = require('../db/index');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    Admin.findOne({
        username: req.headers.username,
        password: req.headers.password
    })
        .then((response) => {
            if (response) {
                next();
            } else {
                res.json({
                    message: 'Admin does not exists'
                })
            }
        })

}

module.exports = adminMiddleware;