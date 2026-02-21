const {Router} = require("express");
const courseRouter = Router();
const {user_courses_data_model} = require("../db");
courseRouter.get("", function(req,res){

})
courseRouter.post("/purchase" , function(req,res)
{
    res.send({
        result:"welcome"
    })
})
module.exports={
    courseRouter
}