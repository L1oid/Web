import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/button-navigate/component.js';
import { UserFactory } from '../../../domain/service.js'
import { useLoginDispatcher } from '../../../state/redux/api.js';

import './component.css';

const user = UserFactory.createInstance();

function LoginWindow(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    let dispatch = useLoginDispatcher();

    function onChangeLogin(login) {
        setLogin(login);
        dispatch(login);
    }

    function onChangePassword(password) {
        setPassword(password);
    }
    
    async function onClickLogin() {
        user.setUser(login, password, undefined);
        let result = await user.authQuery();
        if (result.status === 200) {
            localStorage.setItem('MyStudyOrganaizedUserToken', result.data);
            localStorage.setItem('MyStudyOrganaizedUserLogin', login)
            setStatus("Ok");
            setMessage("Авторизован! Пожалуйста, дождитесь ответа...")
        }
        else if (result.status === 401)
        {
            setStatus("Error");
            setMessage("Неудалось войти! Неправильный логин или пароль.");
        }
        else
        {
            setStatus("Error");
            setMessage("Ошибка сервера! Попробуйте еще раз.")
        }
    }

    return (
        <div className='LoginWindow'>
            <label className='LoginText'>My Study Organaized</label>
            <Input class='LoginInput' type="login" placeholder="Логин" getValue={onChangeLogin}/>
            <Input class='LoginInput' type="password" placeholder="Пароль" getValue={onChangePassword}/>
            <button className='LoginButtons' onClick={onClickLogin}>Логин</button>
            <ButtonNavigate class='LoginButtons' name='Регистрация' value='/register'></ButtonNavigate>
            {status === "Ok" && <label className='MessageText'>{message}</label> && <Navigate to="/chat" replace={true} />}
            {status === "Error" && <label className='MessageText'>{message}</label>}
        </div>
    )
}

export default LoginWindow;