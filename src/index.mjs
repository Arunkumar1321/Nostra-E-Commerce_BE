import dotenv from "dotenv/config"
import express from "express"
import cors from "cors"
import Userroutes from "./user/uroutes.mjs";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import productrouter from "./products/proutes.mjs";
import { User } from "./user/Schema.mjs";
import { hashpassword } from "./Helper/userhash.mjs";
import orderroutes from "./order/oroutes.mjs";
import cartrouter from "./Cart/routes.mjs";
import dns from "dns"
dns.setServers(["8.8.8.8","1.1.1.1"])
const app = express();

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Connected")
})

mongoose.connect(process.env.MONGO_URI).then(async()=>{
    console.log("DBConnected")
}).catch((err)=>{console.log("DB Connection failed",err)})

app.use(cors());   //Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(Userroutes)
app.use(productrouter)
app.use(orderroutes)
app.use(cartrouter)

