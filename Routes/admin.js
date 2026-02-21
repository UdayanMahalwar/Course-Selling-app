const {Router, application} = require("express");
const {admin_data_model} = require("../db");
const jwt = require("jsonwebtoken");
require('dotenv').config() 
const {admin_auth }= require("../auth")
const {JWT_ADMIN_PASS} = process.env;
const adminRouter = Router();
const {z} = require("zod");
const bcrypt = require("bcrypt");
let user_check = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    first_name:z.string(),
    last_name:z.string()
})
adminRouter.post("/signup",async function(req,res)
{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let first_name= req.body.first_name;
    let last_name= req.body.last_name;
    let resource  =await  admin_data_model.findOne({
        email:email
    })
    try{
        user_check.parse({
            name:name,
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
                    await admin_data_model.insertMany({
                        name,email,password:hash,first_name,last_name
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
adminRouter.use(admin_auth);
adminRouter.post("/signin" , function(req,res){ 
   const token = jwt.sign(req.adminId, JWT_ADMIN_PASS);
res.send({
    token:token
})
})

adminRouter.post("/course" , function(req,res)
{

})
adminRouter.put("/course" , function(req,res)
{

})
adminRouter.get("/course/all" , function(req,res)
{

})
module.exports={
    adminRouter
}