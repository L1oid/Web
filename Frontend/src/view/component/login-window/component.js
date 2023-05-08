import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import './component.css';
import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/button-navigate/component.js';

import { UserFactory } from '../../../domain/service.js'
import { useLoginDispatcher } from '../../../state/redux/api.js';

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
        let user = UserFactory.createInstance();
        user.setUser(login, password, undefined);
        let result = await user.authQuery();
        if (result.status === 200) {
            localStorage.setItem('MyStudyOrganaizedUserToken', JSON.stringify(result.data));
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
            <text className='LoginText'>My Study Organaized</text>
            <Input type="login" placeholder="Login" getValue={onChangeLogin}/>
            <Input type="password" placeholder="Password" getValue={onChangePassword}/>
            <button className='LoginButtons' onClick={onClickLogin}>Логин</button>
            <ButtonNavigate class='LoginButtons' name='Регистрация' value='/register'></ButtonNavigate>
            {status === "Ok" && <text className='MessageText'>{message}</text> && <Navigate to="/main" replace={true} />}
            {status === "Error" && <text className='MessageText'>{message}</text>}
        </div>
    )
}

export default LoginWindow;