const express= require("express")
const app=express();
const port=3000;
const router=require("./Router/auth.routes")
const proteced=require("./Router/dashboard")
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(cookieParser())

app.use("/",router);
app.use("/",proteced);

app.get("/",(req,res)=>{
    res.send("server is working")
})



app.listen(port,(req,res)=>{
    console.log(`server is ruuning at http://localhost:${port}`)

})



