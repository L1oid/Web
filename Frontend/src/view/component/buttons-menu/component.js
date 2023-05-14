import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import { useLoginListener } from '../../../state/redux/api.js';

import ButtonNavigate from '../button-navigate/component.js';

import './component.css';

function ButtonsMenu(props) {

    let login = useLoginListener();
    console.log(login);
    const [status, setStatus] = useState('');

    function onClickExit() {
        localStorage.removeItem('MyStudyOrganaizedUserToken');
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