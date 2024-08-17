// Middleware for handling auth
const jwt = require('jsonwebtoken')
const { Admin } = require("../db");
const jwtPassword = 'secret';
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decode = jwt.verify(token,jwtPassword);
        const admin  = await Admin.findOne({ "username": decode.username})
        console.log(decode);
        if(!admin){
             return res.json({ message: 'Unauthorized' });
        }
        return next();
    }
    catch(err){
        return res.json({ message: 'Unauthorized' });
    }
}
    

module.exports = adminMiddleware;