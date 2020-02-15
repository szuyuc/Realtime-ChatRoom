import React from 'react';
import './Messagestext.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import PieceOfMessage from '../PieceOfMessage/PieceOfMessage'


const Messagestext = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><PieceOfMessage message={message} name={name} /></div>)}


    </ScrollToBottom>
)

export default Messagestext;