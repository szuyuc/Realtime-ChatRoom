import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // link to chat page
import './Join.css';
const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='joinOuter'>
            <div className='joinInner'>
                <h1 className='heading'> join</h1>
                <div><input placeholder='Name' className='joinInput' type='text' onChange={(e) => { setName(e.target.value) }} ></input></div>
                <div><input placeholder='Room' className='joinInput margin-20' type='text' onChange={(e) => { setRoom(e.target.value) }} ></input></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='btn margin-20' type='submit'>sign in</button>

                </Link>

            </div>
        </div>
    );
}

export default Join;