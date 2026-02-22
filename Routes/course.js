const {Router} = require("express");
const courseRouter = Router();
const {user_courses_data_model} = require("../db");
courseRouter.post("/purchase" ,async function(req,res)
{
    const userId = req.body.userId;
    const course_id = req.body.course_id   ;
    await user_courses_data_model.create({
        userId , course_id
    })
    res.send({
        result:"Thankypu for purchasing the course"
    })
})
module.exports={
    courseRouter
}