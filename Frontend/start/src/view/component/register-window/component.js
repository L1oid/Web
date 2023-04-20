import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import './component.css';
import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/button-navigate/component';

import { UserFactory } from '../../../domain/service.js'

function RegisterWindow() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    function onChangeLogin(login) {
        setLogin(login);
    }

    function onChangePassword(password) {
        setPassword(password);
    }

    function onChangeEmail(email) {
        setEmail(email);
    }

    async function onClickRegister() {
        let user = UserFactory.createInstance();
        user.setUser(login, password, email);
        let result = await user.registerQuery();
        if (result.status === 200) {
            setStatus("Ok");
            setMessage("Регистрация завершена!")
        }
        else if (result.status === 401)
        {
            setStatus("Error");
            setMessage("Пользователь уже существует! Измение логин или почту.");
        }
        else
        {
            setStatus("Error");
            setMessage("Ошибка сервера! Попробуйте еще раз.")
        }
    }

    return (
        <div className='RegisterWindow'>
            <text className='RegisterText'>Регистрация</text>
            <Input type="login" placeholder="Login" getValue={onChangeLogin}/>
            <Input type="password" placeholder="Password" getValue={onChangePassword}/>
            <Input type="email" placeholder="Email" getValue={onChangeEmail}/>
            <button className='RegisterButtons' onClick={onClickRegister}>Регистрация</button>
            <ButtonNavigate class='RegisterButtons' name='Назад' value='/login'></ButtonNavigate>
            {status === "Ok" && <text className='MessageText'>{message}</text> && <Navigate to="/login" replace={true} />}
            {status === "Error" && <text className='MessageText'>{message}</text>}
        </div>
    )
}

export default RegisterWindow;