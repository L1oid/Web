import React from 'react';
import { Navigate } from "react-router-dom";

import ButtonNavigate from '../../component/ButtonNavigate/component';

import './component.css';

class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className='ButtonsMenu'>
            <button className="ButtonMenu">Решение СЛАУ</button>
            <button className="ButtonMenu">Домашнее задание</button>
            <button className="ButtonMenu">Экзамены и зачёты</button>
            <ButtonNavigate class="ButtonMenu" name="Выход" value='/login'></ButtonNavigate>
        </div>
        );
    }
}

export default Component;