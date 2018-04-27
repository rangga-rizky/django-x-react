import React, { Component } from 'react';
import Main from './Main';
import Sidebar from './Sidebar';

class Home extends Component {

  constructor(){
  	super();
  }	

  render() {
    
    return (
        <div id="main-layout" className="container-fluid">
        <div class="container">
		  <div class="row">
		    <div class="col">
		      <Sidebar />
		    </div>
		    <div class="col-8">
		      <Main/>
		    </div>
		  </div>
		</div>
        </div>
    );
  }
}

export default Home;
