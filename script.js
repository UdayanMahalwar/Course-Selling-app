const express = require("express");
const app = express();
const {userRouter} = require("./Routes/user");
const {courseRouter} = require("./Routes/course");
const {adminRouter} = require("./Routes/admin");
app.use("/user" , userRouter);
app.use("/course",courseRouter);
app.use("/admin" , adminRouter);
app.listen(3000);