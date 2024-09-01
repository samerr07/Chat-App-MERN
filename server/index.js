const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');  // Declared once
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoute");
const { server, socketServer } = require("./socket/socket");
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

dotenv.config();

// Connect to the database
connectDatabase();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
const corsOptions = {
    origin: "https://chat-app-mern-3ij4.vercel.app", // specify your frontend domain here
    credentials: true, // this allows the server to accept cookies from the origin
};

server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(cookieParser());

// Routes
server.use("/api/v1/user", userRouter.router);
server.use("/api/v1/message", messageRouter.router);

server.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
socketServer.listen(process.env.PORT, () => {
    console.log(`Server is started on port ${process.env.PORT}!!!`);
});
