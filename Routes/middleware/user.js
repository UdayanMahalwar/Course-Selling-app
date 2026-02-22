const jwt = require("jsonwebtoken");
require('dotenv').config();
const {JWT_USER_PASS} = process.env;
function user_middleware(req,res, next)
{
   const token = req.headers.token;
   try{
        const decoded = jwt.verify(token,JWT_USER_PASS);
            req.userId = decoded.toString();
        return next();
   }
   catch(e)
   {
    return res.status(401).json({
        message:"not found"
    })
   }
    }
module.exports={
    user_middleware
}