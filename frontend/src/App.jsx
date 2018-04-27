import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import LoginBox from './components/LoginBox';
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: localStorage.getItem('token') != "null"};  
  }

  setLogin(loginStatus){
  	this.setState({isLoggedIn:loginStatus});
  }

  render() {   
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} setLogin = {this.setLogin.bind(this)} />
        {!this.state.isLoggedIn ?  <LoginBox setLogin = {this.setLogin.bind(this)} /> :  <Home /> }
      </div>
    );
  }
}

export default App;
