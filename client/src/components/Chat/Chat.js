import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // query the string from url
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messagestext from '../Messagestext/Messagestext';
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);
        //console.log(socket)
        socket.emit('join', { name, room }, (err) => { if (err) { alert(err); } }) //'join' is the event
        // unmounting: return -> disconenct the effect
        return () => {
            socket.emit('disconnect'); // the same name as in the server side
            socket.off();
        }

    }, [location.search, ENDPOINT])

    useEffect(() => {
        socket.on('message', (message) => {
            // cannot mutate the state, spread all the message and add new one 
            setMessages([...messages, message]);
        })

    }, [messages])

    // fn for sending messages
    const sendMessage = (e) => {
        //full page reload is not good when you onKeyPress or onchange(button clcik) 
        e.preventDefault();
        if (message) {
            // from server side: socket.on(triggername, context,callback)
            socket.emit('sendMessage', message, () => setMessage(''));
        }

        console.log(message, messages)
    }


    return (
        //we create a component for <input> 

        <div className='outercontainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messagestext messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;