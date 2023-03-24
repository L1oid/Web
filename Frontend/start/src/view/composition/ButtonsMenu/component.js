import React from 'react';
import { Navigate } from "react-router-dom";

import ButtonNavigate from '../../component/ButtonNavigate/component';

import './component.css';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        }
        this.onClickExit = this.onClickExit.bind(this);
    }

    onClickExit() {
        localStorage.removeItem('MyStudyOrganaizedUserToken');
        this.setState({status: "Exit"});
    }

    render() {
        return (
        <div className='ButtonsMenu'>
            <button className="ButtonMenu">Решение СЛАУ</button>
            <ButtonNavigate class="ButtonMenu" name='Домашнее задание' value='/homework'></ButtonNavigate>
            <button className="ButtonMenu">Экзамены и зачёты</button>
            <button className="ButtonMenu" onClick={this.onClickExit}>Выход</button>
            {this.state.status === "Exit" && <Navigate to="/login" replace={true} />}
        </div>
        );
    }
}

export default Component;