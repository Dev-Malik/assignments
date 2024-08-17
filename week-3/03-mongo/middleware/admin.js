// Middleware for handling auth
const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        const admin = await Admin.findOne({ username, password });
        if (!admin) {
            return res.status(403).send({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }

    

}

module.exports = adminMiddleware;