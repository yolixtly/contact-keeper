const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware for protected routes
// It decodes the token
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No Token authorization denied' });
    }

    try {
        // Verify the User Token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Set the decoded user to the req.user so the route can use it
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }

}
