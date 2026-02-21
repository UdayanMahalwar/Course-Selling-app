const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const userData=new Schema({
    email:{type:String , unique},
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
const user_data_model = mongoose.model("userData" , userData);
const admin_data_model = mongoose.model("adminData" , adminData);
const course_data_model = mongoose.model("CourseData" , CourseData);
const user_courses_data_model = mongoose.model("userData" , User_Courses);
module.exports={
    user_data_model,admin_data_model,course_data_model,user_courses_data_model
}