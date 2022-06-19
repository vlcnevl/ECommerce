const express = require("express");
const app = express();
const mongoose = require("mongoose")  
const dotenv = require("dotenv") // secret information page ex database url
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")


dotenv.config()
mongoose.connect(process.env.MongoUrl).then(()=> console.log("connection success")).catch((err)=> console.log(err))

app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/auth",authRoute)  

app.listen(process.env.Port || 5000,()=>{ 
    console.log("server running");
})