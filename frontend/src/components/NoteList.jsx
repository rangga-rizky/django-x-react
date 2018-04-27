import React, { Component } from 'react';
import axios from 'axios';
import Note from './Note';

class NoteList extends Component { 

  constructor(){
  	super();
  	this.changeMonth = this.changeMonth.bind(this)
  	this.state = {notes: []}; 
  }	

  componentDidMount() {
  	this.loadData(0);
  }

  changeMonth(e){
    this.loadData(e.target.value);
  }
  
  loadData(bulan){
  	var params = "";
  	if(bulan > 0){
  		params = "?month="+bulan;
  	}  	
  	var config = {
  		headers: {'Authorization': 'Token '+localStorage.getItem('token')}
	};
    axios.get(`http://localhost:8000/notes/`+params, config )
      .then(res => {
        this.setState({ notes: res.data.data });
      })
      .catch((error) => {
      	console.log(error);
        alert("Terjadi Kesalahan");
      })    
      
  }

  render() {

  	const bulan = ["January","February","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    
    return (
        <div className="my-3 p-3 bg-white rounded box-shadow">
	    	<select onChange={this.changeMonth} class="form-control">
			  <option value="0">Tampilkan Semua</option>
			  	 {bulan.map((object, i) => <option value={i+1}>{object}</option>)}
			</select>
			<br/>
	        <h6 className="border-bottom border-gray pb-2 mb-0">Cashflow</h6>
	           {this.state.notes.map((c) => <Note  loadData={this.loadData.bind(this)} key={c.id} note={c} /> ,this)}
	        <small className="d-block text-right mt-3">
	          <a href="#">Created by Ranggaantok@gmail.com</a>
	        </small>
        </div>
    );
  }
}

export default NoteList;
