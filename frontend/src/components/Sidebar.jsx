import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Sidebar extends Component {

 constructor(){
  	super();  	
  	this.state = {"user":{} };
  }		

 componentDidMount() {
  	 this.loadData();      
  }

  loadData(){
    var config = {
      headers: {'Authorization': 'Token '+localStorage.getItem('token')}
  };
    axios.get(`http://localhost:8000/notes/`, config )
      .then(res => {
        this.setState({ user: res.data.user });
      })
      .catch((error) => {
        console.log(error);
        alert("Terjadi Kesalahan");
      })   
  }

  render() {
    
    return (
        <div>
        	<div className="card" style={{width : "18rem"}} >
			  <div className="card-body">
			    <h5 className="card-title">{this.state.user.username}</h5>
			    <p className="card-text">{this.state.user.email}</p>
			  </div>
			  <ul class="list-group list-group-flush">
			    <li class="list-group-item">Saldo {this.state.user.balance}</li>
			    <li class="list-group-item">joined since {this.state.user.date_joined}</li>
			  </ul>	
  			  <div className="card-body">
  			    <Link className="btn btn-primary" to={`/new`}> Buat Catatan </Link>
			   </div>
			</div>
        </div>
    );
  }
}

export default Sidebar;
