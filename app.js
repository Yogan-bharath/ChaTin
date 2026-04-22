const http = require('http')
const express = require('express')
const app = express();
const server = http.createServer(app)
const path = require('path')
const {Server} = require('socket.io')
const io = new Server(server)
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.get('/public',(req,res)=>{
    res.sendFile(path.join(__dirname,"html/index.html"))
})

io.on('connection',(socket)=>{
    socket.on('user-message',(message)=>{
        io.emit("message",message);
    })
})

server.listen(PORT,()=>{
    console.log("srever is running in ",PORT);
})