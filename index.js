let express = require('express')
let socket = require('socket.io')
let app = express()
let PORT = process.env.PORT || 3001
let server = app.listen(PORT, () => {
    console.log(`listening to port ${PORT}!`)
})
let io = socket(server)
let redis = require('socket.io-redis')
io.adapter(redis({
    host: 'localhost',
    port: '6379'
}))

io.on('connection', (socket) => {
    console.log(`connected to socket ${socket.id}`)

    socket.on('new-conversation', data => {
        io.sockets.emit('new-conversation', data)
        console.log(`new-conversation event triggered with data ${data}`)
    })

    socket.on('delete-conversation', data => {
        socket.broadcast.emit('delete-conversation', data)
        console.log(`delete-conversation event triggered with data ${data}`)
    })
})