const {User} = require("../db");
const jwt = require('jsonwebtoken')
const jwtPassword = 'secret';
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expectedconst token = req.headers.authorization?.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decode = jwt.verify(token,jwtPassword);
        const user  = await User.findOne({ username: decode.username})
        if(!user){
             return res.json({ message: 'Unauthorized' });
        }
        next();
    }
    catch(err){
        return res.json({ message: 'Unauthorized' });
    }
    }


module.exports = userMiddleware;