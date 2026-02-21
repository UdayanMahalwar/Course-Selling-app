const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config({ quiet: true })
const app = express();
const {userRouter} = require("./Routes/user");
const {courseRouter} = require("./Routes/course");
const {adminRouter} = require("./Routes/admin");
app.use("/user" , userRouter);
app.use("/course",courseRouter);
app.use("/admin" , adminRouter);
async function main(){
    try{
        await mongoose.connect(process.env.db_link);
    }
    catch(e)
    {
        console.log("connection failed "+e);
        return ;
    }
    console.log("connected");
    app.listen(3000);
}
main();