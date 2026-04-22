const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "html/index.html"));
});

io.on('connection', (socket) => {
  socket.on('user-message', (message) => {
    io.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on", PORT);
});