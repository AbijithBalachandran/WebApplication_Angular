

const jwt = require('jsonwebtoken');
const secretKey = require('../config/config');


const ifAuthenticated = (req,res,next)=>{

     const token  = req.cookies?.token;

     if(!token){
        return next();
     }

     try {
        const decoded = jwt.verify(token,secretKey);
        return res.status(403).json({message:'Already logged in'});
     } catch (error) {
         return next();
     }

     
}


module.exports = ifAuthenticated;