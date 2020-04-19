const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = "TODO"

server.listen(port, () => console.log(`Listening on port ${port}`));
let userCount = 0;
let gameState = null;
io.sockets.on('connection',socket=>{
    socket.emit('gameState',gameState);
    socket.on('updateState',(data)=>{
        console.log('updating game');
        gameState = data;
        socket.broadcast.emit('gameState',gameState);
    });

    


});
