const express = require('express')
const { Socket } = require('net')
const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    socket.on('message', (msg)=>{
        console.log(msg)
        // todos conectados
        io.emit('message', msg);
    })
})



http.listen(4444, ()=>{
    console.log('listening on port 4444')
})
