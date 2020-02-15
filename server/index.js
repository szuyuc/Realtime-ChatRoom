const express = require('express');
const socketio = require('socket.io'); // if you want to do something in real time, not http. http is slow.
const http = require('http')
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUsers, removeUsers, getUser, getUserInRoom } = require('./users.js');

app.use(router);
app.use(cors());


// socketio code
io.on('connection', (socket) => {
    console.log('We have a new connection...!!! ')

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUsers({ id: socket.id, name, room })
        console.log('I received a private message by ', name, ' saying room:', room);
        //init callback
        if (error) return callback(error);
        //console.log(user.room);
        socket.join(user.room);
        // send welcome message to the user 
        //emit send message from backend to frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        //broadcast -> send the message to everyone beside the user 
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` });


        io.to(user.room).emit('roomdata', { room: user.room, users: getUserInRoom(user.room) })
        callback();
    });

    // for user generating the messages 
    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();



    });

    socket.on('disconnect', () => {
        console.log('User Left!!! ')
        const user = removeUsers(socket.id);

        if (user) {
            io.to(user.room).emit('message', { leftUser: 'admin', text: `${user.name} has left.` });

        }
        //io.emit('user disconnected');
    });
});



server.listen(PORT, () => console.log(`Server has started on ${PORT}`));

