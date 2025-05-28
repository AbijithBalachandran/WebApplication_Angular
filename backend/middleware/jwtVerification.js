
const jwt = require('jsonwebtoken');
const secretKey = require('../config/config');

const verifyToken = (req,res , next)=>{
     const token = req.cookies.token;

     if(!token){
        return res.status(401).json({message:'Unauthorized'});
     }

     try {
        
        const decoded = jwt.verify(token , secretKey);
        req.user = decoded;
        next();

     } catch (error) {
        return res.status(401).json({message:'Invalid token'})
     }
}


module.exports = verifyToken;