import React, { useState, useRef, useEffect } from "react";

import { ChatFactory } from "../../../domain/service.js";
import { useLoginListener } from '../../../state/redux/api.js';

import './component.css';

const chat = ChatFactory.createInstance();

function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messageEnd = useRef(null);
    const login = useLoginListener();

    useEffect(() => {
        chat.subscribe(message => {
            setMessages(messages => [...messages, message]);
        })
        chat.open(login);
        return () => {
            chat.close();
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function scrollToBottom() {
        messageEnd.current.scrollIntoView({ behavior: 'smooth' });
    }

    function onClickSend() {
        chat.send(message);
        setMessage("");
    }

    return (
        <div className="ChatContainer">
            <div className="MessagesContainer">
                {messages.map((message, index) => (
                    <div className="MessageUser" key={index}>
                        <h3>{message.username}</h3>
                        <p>{message.text}</p>
                    </div>
                ))}
            <div ref={messageEnd} />
        </div>
        <div className="InputContainer">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Введите сообщение" />
            <button onClick={onClickSend}>Отправить</button>
        </div>
      </div>
    )
}

export default Chat;