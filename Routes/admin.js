const {Router, application} = require("express");
const {admin_data_model} = require("../db");
const adminRouter = Router();
adminRouter.post("/signup", function(req,res)
{

})
adminRouter.use(admin_data_model);
adminRouter.post("/signin" , function(req,res){

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