// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const dotenv = require("dotenv");
// const connectDatabase  = require('./config/database');
// const userRouter = require("./routes/userRoutes")
// const messageRouter = require("./routes/messageRoute")
// const {server, socketServer} = require("./socket/socket")



// dotenv.config()


// //crete a server
// // const server = express();

// //connecting a database
// connectDatabase()

// //middlewares

// const corsOption={
//     origin: true,
//     credentials:true
// };
// server.use(cors(corsOption));
// server.use(express.json());
// server.use(express.urlencoded({extended: true}));
// server.use(cookieParser())



// //Routes
// server.use("/api/v1/user",userRouter.router)
// server.use("/api/v1/message",messageRouter.router)


// server.get("/",(req,res)=>{
//     res.send("Hello World")
// })

// //listening on port

// // server.listen(process.env.PORT, ()=>{
// //     console.log("Server is started !!!")
// // })

// socketServer.listen(process.env.PORT, ()=>{
//     console.log("Server is started !!!")
// })




const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoute");
const { server, socketServer } = require("./socket/socket");

dotenv.config();

// Connect to the database
connectDatabase();

// Middleware configurations
const allowedOrigins = [
    'https://chat-app-mern-si4h.vercel.app',
    'https://chat-app-mern-two-eosin.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("Origin: ", origin);  // Add logging to help debug
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next();
})

// Routes
server.use("/api/v1/user", userRouter.router);
server.use("/api/v1/message", messageRouter.router);

server.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
socketServer.listen(process.env.PORT, () => {
    console.log("Server is started on port", process.env.PORT);
});
