const {Router} = require("express");
const courseRouter = Router();
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