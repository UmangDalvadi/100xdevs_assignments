// Middleware for handling auth
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const bearerToken = req.headers.authorization;
    const bearerTokenArray = bearerToken.split(" ");
    const token = bearerTokenArray[1];
    try {
        const verified = jwt.verify(token, jwtPassword);
        if (verified.username) {
            next();
        }
    } catch (err) {
        res.json({
            message: 'Invalid token'
        })
    }


}

module.exports = adminMiddleware;