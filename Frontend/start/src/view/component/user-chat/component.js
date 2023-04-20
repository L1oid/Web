import React, { useState, useEffect } from 'react';

import Input from '../../component/Input/component.js';
import './component.css';

function UserChat() {

    const [chatUser, setChatUser] = useState('');
    const [messages, setMessages] = useState(['']);
    const [message, setChatUser] = useState('');

    useEffect(() => {
        setChatUser("Пользователь");
    });

    function onChangeMessage() {

    }

    return (
        <div className='ChatWindow'>
            <text className='ChatUserName'>{chatUser}</text>
            <div className='ChatSend'>
                <Input class="ChatSendInput" type="text" placeholder="Написать сообщение..." getValue={onChangeMessage}></Input>
                <button className='ChatSendButton'>Отправить</button>
            </div>
        </div>
    )
}

export default UserChat;