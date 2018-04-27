import React, { Component } from 'react';
import axios from 'axios'

class  LoginBox extends Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.state = { username: "", password :"" };
  }

  handleUsername(e){
    this.setState({ username: e.target.value });
  }

  handlePassword(e){
    this.setState({ password: e.target.value });
  }

  login () {
    
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    if(data["username"].length > 0 &&   data["password"].length > 0 ){
      axios.post(`http://localhost:8000/get-token/`,  data )
      .then(res => {
        localStorage.setItem('token',res.data.token)
        this.props.setLogin(true)
      })
      .catch((error) => {
        alert("Username dan Password tidak tepat");
      })  
    }else{
      alert("Form tidak lengkap");
    }     
  }

  render() {       
    return (
        <div className="text-center">
        	<form className="form-signin">
		      <h1 className="h3 mb-3 font-weight-normal">Masuk untuk melihat Catatan Keuanganmu</h1>
		      <label for="inputUsername" class="sr-only">Email address</label>
     		    <input type="text" id="inputUsername" onChange={ this.handleUsername }  class="form-control" placeholder="Username" required autofocus />
     		  <label for="inputPassword" class="sr-only">Password</label>
      		  <input type="password" id="inputPassword" onChange={ this.handlePassword } class="form-control" placeholder="Password" required />
		      <button className="btn btn-lg btn-primary btn-block" onClick={this.login} type="button">Sign in</button>
		      <p className="mt-5 mb-3 text-muted">&copy; ranggaantok@gmail.com</p>
		    </form>
        </div>
    );
  }
}

export default LoginBox;
