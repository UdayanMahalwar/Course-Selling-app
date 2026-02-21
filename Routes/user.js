const {Router, application} = require("express");
const userRouter = Router();
const {user_auth} = require("../auth");
const {user_data_model} = require("../db");
const {z, email} = require("zod");
const bcrypt = require("bcrypt");
const { _catch } = require("zod/v4/core");
let user_check = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    first_name:z.string(),
    last_name:z.string()
})
userRouter.post("/signup", async function(req,res)
{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let first_name= req.body.first_name;
    let last_name= req.body.last_name;
    let resource  =await  user_data_model.findOne({
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
                    await user_data_model.insertMany({
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
userRouter.use(user_auth);
userRouter.post("/signin" , function(req,res){
    res.send("signed in successFully");
})
userRouter.get("/course" , function(req,res)
{

})
module.exports={
    userRouter
}