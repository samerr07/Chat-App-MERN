const { Server } = require("socket.io");
const http = require("http");
const express = require("express");


const server = express();

const socketServer = http.createServer(server);

const io = new Server(socketServer,{
    cors:{
        origin:true,
        methods:['GET', 'POST'],
    }
})


const getReceiverSocketId = (recieverId)=>{
    return userSocketMap[recieverId];
}

const userSocketMap = {};  // {userId: socketId}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId !== "undefined"){
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})


module.exports = { server, socketServer, io,getReceiverSocketId };
