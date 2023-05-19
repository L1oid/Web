import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/button-navigate/component';
import { UserFactory } from '../../../domain/service.js'

import './component.css';

const user = UserFactory.createInstance();

function RegisterWindow() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    async function onClickRegister() {
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
            <label className='RegisterText'>Регистрация</label>
            <Input class="RegisterInput" type="login" placeholder="Логин" getValue={setLogin}/>
            <Input class="RegisterInput" type="password" placeholder="Пароль" getValue={setPassword}/>
            <Input class="RegisterInput" type="email" placeholder="Электронная почта" getValue={setEmail}/>
            <button className='RegisterButtons' onClick={onClickRegister}>Регистрация</button>
            <ButtonNavigate class='RegisterButtons' name='Назад' value='/login'></ButtonNavigate>
            {status === "Ok" && <label className='MessageText'>{message}</label> && <Navigate to="/login" replace={true} />}
            {status === "Error" && <label className='MessageText'>{message}</label>}
        </div>
    )
}

export default RegisterWindow;