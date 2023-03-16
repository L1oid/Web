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
      email: "",
      status: null,
      message: null
    }
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
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

  onChangeEmail(email) {
    this.setState({
      email: email
    });
  }

  async onClickRegister() {
    let login = this.state.login;
    let password = this.state.password;
    let email = this.state.email;
    let user = UserFactory.createInstance();
    user.setUser(login, password, email);
    let result = await user.registerQuery();
    if (result.status == 200) {
        this.setState({status: "Ok"});
        this.setState({message: "Register is complete!"})
    }
    else if (result.status == 401)
    {
      this.setState({status: "Error"});
      this.setState({message: "User already exist! Try another login or email."});
    }
    else
    {
      this.setState({status: "error"});
      this.setState({message: "Server error! Try again."})
    }
  }

  render() {
    return (
      <div className='RegisterWindow'>
        <text className='RegisterText'>Registration</text>
        <Input type="login" placeholder="Login" getValue={this.onChangeLogin}/>
        <Input type="password" placeholder="Password" getValue={this.onChangePassword}/>
        <Input type="email" placeholder="Email" getValue={this.onChangeEmail}/>
        <button className='RegisterButtons' onClick={this.onClickRegister}>Register</button>
        <ButtonNavigate class='RegisterButtons' name='Back' value='/login'></ButtonNavigate>
        {this.state.status == "Ok" && <text className='MessageText'>{this.state.message}</text> && <Navigate to="/login" replace={true} />}
        {this.state.status == "Error" && <text className='MessageText'>{this.state.message}</text>}
      </div>
    );
  }
}

export default Component;