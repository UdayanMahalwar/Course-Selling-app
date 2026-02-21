const {z, string} = require("zod");
const bcrypt = require("bcrypt");
const { admin_data_model , user_data_model } = require("./db");
const user_check = z.object({
    email : z.string(),
    password:z.string()
})
async function admin_auth(req,res,next)
{
    const email = req.body.email;
    const password = req.body.password;
    try{
        user_check.parse({
            email,
            password  
        })
    }
    catch(e)
    {
        console.log("error occured");
        return res.send("error occured -> invalid input")
    }
    const data = await admin_data_model.findOne({
        email
    })
    if(data)
    {
        let check = await bcrypt.compare(password , data.password)
    if(check)
       {
        return next();
       }
       else
       {
        return res.status(400).send("errror occured");
       }
    } 
    else
    {
        return res.status(404).send("Not Found");
    }
}
async function user_auth(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    try{
        user_check.parse({
            email,
            password 
        })
    }
    catch(e)
    {
        console.log("error occured");
        return res.send("error occured -> invalid input")
    }
    const data = await user_data_model.findOne({
        email
    })
    if(data)
    {
       let check = await bcrypt.compare(password , data.password)
       if(check)
       {
        return next();
       }
       else
       {
        return res.status(400).send("errror occured");
       }
    } 
    else
    {
        return res.status(404).send("Not Found");
    }
    }
module.exports={
    user_auth,
    admin_auth
}
