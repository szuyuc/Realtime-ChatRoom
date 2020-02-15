import React from 'react';
import './InfoBar.css';
import leaveicon from '../../icons/leaveicon.png';
import onlineicon from '../../icons/onlineicon.png';

const InfoBar = ({ room }) => (
    <div className='infobar' >
        <div className='leftInner'>
            <img className='onlineicon' src={onlineicon} alt='online img' />

            <h3>{room}</h3>
        </div>
        <div className='rightInner'>
            <a href='/'><img className='leaveicon' src={leaveicon} alt='leave img' /></a>
        </div>
    </div>

)

export default InfoBar;