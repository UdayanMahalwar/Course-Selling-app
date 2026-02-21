const {Router} = require("express");
const userRouter = Router();
const {user_data_model} = require("../db");
userRouter.post("/signup", function(req,res)
{

})
userRouter.post("/signin" , function(req,res){

})
userRouter.get("/course" , function(req,res)
{

})
module.exports={
    userRouter
}