import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import { Provider } from 'react-redux';
import Store from '../../redux/store.js';
import { useSelector } from 'react-redux';

import ButtonNavigate from '../../component/ButtonNavigate/component';

import './component.css';

function ButtonsMenu(props) {

    const value = useSelector((state) => state.value);
    const [status, setStatus] = useState('');

    function onClickExit() {
        localStorage.removeItem('MyStudyOrganaizedUserToken');
        setStatus("Exit");
    }

    return (
        <Provider store = {Store} >
            <div className='ButtonsMenu'>
                <button className="ButtonMenu">Решение СЛАУ</button>
                <ButtonNavigate class="ButtonMenu" name='Домашнее задание' value='/homework'></ButtonNavigate>
                <button className="ButtonMenu">Экзамены и зачёты</button>
                <button className="ButtonMenu" onClick={onClickExit}>Выход <small>@{value}</small></button>
                {status === "Exit" && <Navigate to="/login" replace={true} />}
            </div>
        </Provider>
    )
}

export default ButtonsMenu;