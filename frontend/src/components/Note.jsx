import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Note extends Component { 

	constructor () {
    	super() 
    	this.destroyNote = this.destroyNote.bind(this)
	}

	destroyNote(e) {
		e.preventDefault();
	  	
	  	var config = {
	  		headers: {'Authorization': 'Token '+localStorage.getItem('token'),
	  				 'Content-Type': 'application/json'	}
		};
     
		axios.delete(`http://localhost:8000/notes/`+e.target.id+"/", config)
		      .then(res => {
		      	  this.props.loadData(0)
		      })  
  	}


  render() {    
  	function  ValueTxt(note){
	  	if(note.type_note == "IN"){
	  		return <span style={{color : "green"}}> + {note.value}</span>
	  	}else{
	  		return <span style={{color : "red"}}> - {note.value}</span>
	  	}

    }

    return (
        <div className="media text-muted pt-3">
	        <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
	        	<span>{this.props.note.date_modified}</span>
	            <div class="d-flex justify-content-between align-items-center w-100">		                          
	        	  <strong className="d-block text-gray-dark">{this.props.note.name}</strong>
	              <div> 
 					<Link to={`/update/`+this.props.note.id}> Ubah</Link>
	              	&nbsp;
	              	<a href="#" id={this.props.note.id} onClick={this.destroyNote}>Hapus</a>
	              </div>	              
	            </div>
	            <span class="d-block">
	                <ValueTxt value={this.props.note.value_with_format} type_note={this.props.note.type_note} />
	             </span>
	          </div>        
	         
	         <br/>
	    </div>
        
    );
  }
}

export default Note;
