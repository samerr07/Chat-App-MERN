const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const connectDatabase  = require('./config/database');
const userRouter = require("./routes/userRoutes")
const messageRouter = require("./routes/messageRoute")
const {server, socketServer} = require("./socket/socket")



dotenv.config()


//crete a server
// const server = express();

//connecting a database
connectDatabase()

//middlewares

const corsOption={
    origin:'http://localhost:5173',
    credentials:true
};
server.use(cors(corsOption));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser())



//Routes
server.use("/api/v1/user",userRouter.router)
server.use("/api/v1/message",messageRouter.router)


server.get("/",(req,res)=>{
    res.send("Hello World")
})

//listening on port

// server.listen(process.env.PORT, ()=>{
//     console.log("Server is started !!!")
// })

socketServer.listen(process.env.PORT, ()=>{
    console.log("Server is started !!!")
})
