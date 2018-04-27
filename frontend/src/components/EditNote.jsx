import React, { Component } from 'react';
import axios from 'axios';
import { withRouter,Link } from "react-router-dom";

class EditNote extends Component {

	constructor(){
	    super();
	    this.updateNote = this.updateNote.bind(this);
	    this.handleName = this.handleName.bind(this);
    	this.handleValue = this.handleValue.bind(this);
    	this.handleType = this.handleType.bind(this);
    	this.state = { name: "", value :"" ,type_note: "IN"};
  	}

  	handleName(e){
    	this.setState({ name: e.target.value });
  	}

  	handleValue(e){
    	this.setState({ value: e.target.value });
  	}

  	handleType(e){
    	this.setState({ type_note: e.target.value });
	}

	componentDidMount() {
  		this.loadData(this.props.match.params.id);
	}
	  
	loadData(id){
	  	var config = {
	  		headers: {'Authorization': 'Token '+localStorage.getItem('token')}
		};
	    axios.get(`http://localhost:8000/notes/`+id+'/', config )
	      .then(res => {
	      	console.log(res.data.value);
	        this.setState({ name: res.data.name, value :res.data.value.toString() ,type_note: res.data.type_note});
	      })   
	      
	}

    
  	updateNote() {

	  	var config = {
	  		headers: {'Authorization': 'Token '+localStorage.getItem('token'),
	  				 'Content-Type': 'application/json'	}
		};
	    
	    const data = {
	      name: this.state.name,
	      value: parseInt(this.state.value),
	      type_note: this.state.type_note,
	    };
	    console.log(this.state.value);
	    if(data["name"].length > 0 &&  this.state.value.length > 0 ){

		    axios.put(`http://localhost:8000/notes/`+this.props.match.params.id+'/',  data ,config)
		      .then(res => {
		      	this.props.history.push("/");
		      })
		      .catch((error) => {
		      	console.log(error)
		        alert("Terjadi Kesalahan");
		      }) 
		}else{
			alert("Form tidak lengkap");
		}       
  	}

   render() {
  	return (
        <div className="card" >
         <div className="card-body">
        	<form>
			  <div className="form-group">
			    <label for="">Name</label>
			    <input onChange={this.handleName} value={this.state.name} type="text" className="form-control"  placeholder="Enter Name" />
			  </div>

			  <div className="form-group">
			    <label for="">Value</label>
			    <input onChange={this.handleValue} value={this.state.value} type="number" className="form-control"  placeholder="Enter Value ex: 15000" />
			  </div>

			  <div className="form-group">
			    <label for="">Type</label>
			    <select onChange={this.handleType} value={this.state.type_note} class="form-control">
				  <option value="IN">IN</option>
				  <option value="OUT">OUT</option>
				</select>
			  </div>			  

			  <button onClick={this.updateNote} type="button" className="btn btn-primary">Update</button>
			  <Link style={{marginLeft : "1rem"}} className="btn btn-danger" to={`/`}> Batal</Link>
			</form>
			</div>
        </div>
    );
  }
}

export default withRouter(EditNote);
