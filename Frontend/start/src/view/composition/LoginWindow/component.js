import React from 'react';
import { Navigate } from "react-router-dom";

import './component.css';
import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/ButtonNavigate/component';

import { UserFactory } from '../../../domain/service.js'

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      status: null,
      message: null
    }
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onChangeLogin(login) {
    this.setState({
      login: login
    });
  }

  onChangePassword(password) {
    this.setState({
      password: password
    });
  }

  async onClickLogin() {
    let login = this.state.login;
    let password = this.state.password;
    let user = UserFactory.createInstance();
    user.setUser(login, password, undefined);
    let result = await user.authQuery();
    if (result.status === 200) {
      localStorage.setItem('MyStudyOrganaizedUserToken', JSON.stringify(result.data));
      this.setState({status: "Ok"});
      this.setState({message: "Авторизован! Пожалуйста, дождитесь ответа..."})
    }
    else if (result.status === 401)
    {
      this.setState({status: "Error"});
      this.setState({message: "Не удалось войти! Неправильный логин или пароль."})
    }
    else
    {
      this.setState({status: "Error"});
      this.setState({message: "Ошибка сервера! Попробуйте еще раз."})
    }
  }

  render() {
    return (
      <div className='LoginWindow'>
        <text className='LoginText'>My Study Organaized</text>
        <Input type="login" placeholder="Login" getValue={this.onChangeLogin}/>
        <Input type="password" placeholder="Password" getValue={this.onChangePassword}/>
        <button className='LoginButtons' onClick={this.onClickLogin}>Логин</button>
        <ButtonNavigate class='LoginButtons' name='Регистрация' value='/register'></ButtonNavigate>
        {this.state.status === "Ok" && <text className='MessageText'>{this.state.message}</text> && <Navigate to="/main" replace={true} />}
        {this.state.status === "Error" && <text className='MessageText'>{this.state.message}</text>}
      </div>
    );
  }
}

export default Component;