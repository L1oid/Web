import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import { useLoginListener } from '../../../state/redux/api.js';
import { UserFactory } from '../../../transport/service.js'
import ButtonNavigate from '../button-navigate/component.js';

import './component.css';

const user = UserFactory.createInstance();

function ButtonsMenu() {

    let login = useLoginListener();
    const [status, setStatus] = useState('');

    function onClickExit() {
        user.exit();
        setStatus("Exit");
    }

    return (
        <div className='ButtonsMenu'>
            <ButtonNavigate class="ButtonMenu" name ='Чат' value='/chat'></ButtonNavigate>
            <ButtonNavigate class="ButtonMenu" name='Домашнее задание' value='/homework'></ButtonNavigate>
            <button className="ButtonMenu" onClick={onClickExit}>Выход <small>@{login}</small></button>
            {status === "Exit" && <Navigate to="/login" replace={true} />}
        </div>
    )
}

export default ButtonsMenu;