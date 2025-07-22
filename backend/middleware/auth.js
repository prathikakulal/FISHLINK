const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from the 'auth-token' header
    const token = req.header('auth-token');

    // Check if there is no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add the user's payload (which contains their ID) to the request object
        req.user = decoded.user; 
        next(); // Proceed to the next step (the route handler)
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};