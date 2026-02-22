const jwt = require("jsonwebtoken");
require('dotenv').config();
const {JWT_ADMIN_PASS} = process.env;
function admin_middleware(req,res, next)
{
   const token = req.headers.token;
   try{
        const decoded  = jwt.verify(token,JWT_ADMIN_PASS);
        req.userId = decoded.toString();
        return next();
   }
   catch(e)
   {
    return res.status(404).json({
        message:"not found"
    })
   }
}
module.exports={
    admin_middleware
}