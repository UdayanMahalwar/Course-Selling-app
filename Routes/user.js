const {Router, application} = require("express");
const userRouter = Router();
const {user_auth} = require("../auth");
const {user_data_model} = require("../db");
const {z, email} = require("zod");
const bcrypt = require("bcrypt");
const {JWT_USER_PASS} = process.env;
const jwt = require("jsonwebtoken");
const {user_middleware} = require("./middleware/user");
require('dotenv').config(); 
let user_check = z.object({
    email:z.string(),
    password:z.string(),
    first_name:z.string(),
    last_name:z.string()
})
userRouter.post("/signup", async function(req,res)
{
    let email = req.body.email;
    let password = req.body.password;
    let first_name= req.body.first_name;
    let last_name= req.body.last_name;
    let resource  =await  user_data_model.findOne({
        email:email
    })
    try{
        user_check.parse({
            email:email, 
            password:password,
            first_name:first_name,
            last_name:last_name,
        })
    }
    catch(e)
    {
        return res.send("invalid inputs");
    }
    if(resource)
    {
       return res.send("already present User");
    }
        bcrypt.genSalt( 10 , function(err , salt)
        {
            if(!err)
            {
                bcrypt.hash(password , salt , async function(err,hash)
            {
                if(!err)
                {
                    await user_data_model.insertMany({
                        email,password:hash,first_name,last_name
                    })
                    res.send("signed up successfully")
                }
                else
                {
                    res.status(404).send("error occured");
                }
                
            })     
            }
            else
            {
                res.status(404).send("error occured");
            }
            
        })
})

userRouter.post("/signin" ,user_auth, function(req,res){
    const token = jwt.sign(req.userId , JWT_USER_PASS);
    res.send({
        token:token
    })
})
userRouter.use(user_middleware)
userRouter.get("/course" , function(req,res)
{
    res.send("done");
})
module.exports={
    userRouter
}