const {Router, application} = require("express");
const {admin_data_model , course_data_model} = require("../db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
require('dotenv').config() 
const {admin_auth }= require("../auth")
const {JWT_ADMIN_PASS} = process.env;
const adminRouter = Router();
const {z} = require("zod");
const bcrypt = require("bcrypt");
const {admin_middleware} = require("./middleware/admin");
let user_check = z.object({
    email:z.string(),
    password:z.string(),
    first_name:z.string(),
    last_name:z.string()
})
adminRouter.post("/signup",async function(req,res)
{
    let email = req.body.email;
    let password = req.body.password;
    let first_name= req.body.first_name;
    let last_name= req.body.last_name;
    let resource  =await  admin_data_model.findOne({
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
                    await admin_data_model.insertMany({
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
adminRouter.post("/signin" ,admin_auth, function(req,res){ 
   const token = jwt.sign(req.adminId, JWT_ADMIN_PASS);
res.send({
    token:token
})
})
 adminRouter.use(admin_middleware);
adminRouter.post("/course" , async function(req,res)
{
    const uid = req.userId
    const { c_name,price,description,img_url} = req.body;
    await course_data_model.create({
        c_name,
        price,
        description,img_url,
        creater_id:uid
    })
    res.send({
        msg:"done"
    })
})
adminRouter.put("/course" ,async function(req,res)
{
   let courseId = req.body.courseId;
   let {name , description , price , img_url} = req.body;
   let userId = req.userId;
   await course_data_model.updateOne({
    _id:courseId ,
    creater_id:userId } , {c_name:name , description , price , img_url })
    res.send("done")
})
adminRouter.get("/course/all" , function(req,res)
{
    res.send({output : req.userId});
})
module.exports={
    adminRouter
}