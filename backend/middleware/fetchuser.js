// // const jwt = require('jsonwebtoken');
// // // You should store your JWT secret in an environment variable file (.env)
// // const JWT_SECRET = process.env.JWT_SECRET || 'YourDefaultSecretString';

// // const fetchuser = (req, res, next) => {
// //     // 1. Get the token from the request header named 'auth-token'
// //     const token = req.header('auth-token');
// //     if (!token) {
// //         return res.status(401).send({ error: "Access denied. No token provided." });
// //     }

// //     try {
// //         // 2. Verify the token using your secret key
// //         const data = jwt.verify(token, JWT_SECRET);
// //         // 3. If valid, attach the user's ID to the request object
// //         req.user = data.user;
// //         next(); // 4. Pass control to the next function (your API route logic)
// //     } catch (error) {
// //         res.status(401).send({ error: "Access denied. Invalid token." });
// //     }
// // }

// // module.exports = fetchuser;





















// // middleware/fetchuser.js

// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'YourDefaultSecretString';

// const fetchuser = (req, res, next) => {
//     // 1. Get the token from the request header named 'auth-token'
//     const token = req.header('auth-token');
//     if (!token) {
//         return res.status(401).send({ message: "Access denied. Please login to continue." });
//     }

//     try {
//         // 2. Verify the token using your secret key
//         const data = jwt.verify(token, JWT_SECRET);
//         // 3. If valid, attach the user's ID to the request object
//         req.user = data.user;
//         next(); // 4. Pass control to the next function (your API route logic)
//     } catch (error) {
//         res.status(401).send({ message: "Access denied. Invalid token." });
//     }
// }

// module.exports = fetchuser;












// middleware/fetchuser.js

const jwt = require('jsonwebtoken');
// ✅ It will now ONLY use the secret from your .env file
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // 1. Get the token from the request header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }

    // ✅ Added a check to ensure the secret key is loaded
    if (!JWT_SECRET) {
        return res.status(500).send({ message: "Server error: JWT_SECRET is not configured." });
    }

    try {
        // 2. Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);
        // 3. Attach the user's ID to the request object
        req.user = data.user;
        next();
    } catch (error) {
        // This error is thrown if the token doesn't match the secret
        res.status(401).send({ message: "Access denied. Invalid token." });
    }
}

module.exports = fetchuser;
