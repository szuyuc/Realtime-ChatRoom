import React from 'react';
import './PieceOfMessage.css';
import ReactEmoji from 'react-emoji';



const PieceOfMessage = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    console.log("PieceOfMessage");




    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className='messagecontainer justifyEnd'>
                    <p className='sender pr-10' > {trimmedName}</p>
                    <div className='messagebox backgroundblue'>
                        <p className='messagetext colorwhite'>{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>

            )
            : (
                <div className='messagecontainer justifyStart'>
                    <div className='messagebox backgroundlight'>
                        <p className='messagetext colordark'>{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className='sender pl-10'> {user}</p>
                </div>
            )
    )

}

export default PieceOfMessage;