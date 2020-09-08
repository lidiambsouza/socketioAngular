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

    let sub = setInterval(()=>{
        io.to(socket.id).emit('message', {
            from:'server',
            message: 'Hello from server'
        });
    }, 2000);

   // socket.on('disconnection')

})



http.listen(4444, ()=>{
    console.log('listening on port 4444')
})
