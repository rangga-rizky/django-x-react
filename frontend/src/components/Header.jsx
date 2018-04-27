import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  
  constructor () {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout(e){
  	e.preventDefault();
  	localStorage.clear();
  	this.props.setLogin(false);
  }

  render() {
    
    return (
		 <header>
	      <div className="navbar navbar-dark bg-dark box-shadow">
	        <div className="container d-flex justify-content-between">
	          <Link to={`/`} className="navbar-brand d-flex align-items-center"> 
	            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
	            <strong>Wallet Watcher</strong>
	          </Link>
	        </div>{this.props.isLoggedIn ? 
	         <ul class="navbar-nav px-3">
		        <li class="nav-item text-nowrap">
		          <a class="nav-link" href="#" onClick={this.handleLogout} >Sign out</a>
		        </li>
		      </ul> : 
		      ''}
	      </div>
	      </header>
    );
  }
}

export default Header;
