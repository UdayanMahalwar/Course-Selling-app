const mongoose = require("mongoose");
async function connect()
{
    try{
        await mongoose.connect("mongodb+srv://mahalwarudayan_db_user:12345@cluster0.dk9ilim.mongodb.net/course-selling-app")
    }
    catch(e)
    {
        console.log("error occured");
        return ;
    }
}
connect();
console.log("connected to database");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const userData=new Schema({
    email:{type:String , unique:true},
    password:String,
    first_name:String,
    last_name:String
})
const adminData=new Schema({
    email:{type:String , unique:true},
    password:String,
    first_name:String,
    last_name:String
})
const CourseData=new Schema({
    c_name:String,
    price:Number,
    description:Number,
    img_url:String,
    creater_id:ObjectId
})
const User_Courses =new Schema({
    user_id:ObjectId,
    course_id:ObjectId
})
const user_data_model = mongoose.model("userData" , userData , "userData");
const admin_data_model = mongoose.model("adminData" , adminData , "adminData");
const course_data_model = mongoose.model("CourseData" , CourseData , "CourseData");
const user_courses_data_model = mongoose.model("user_course_data" , User_Courses ,"user_course_data");
module.exports={
    user_data_model,admin_data_model,course_data_model,user_courses_data_model
}