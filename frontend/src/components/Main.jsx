import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import NoteList from './NoteList'
import CreateNote from './CreateNote'
import EditNote from './EditNote'

class Main extends Component {
  render() {
    return (
       <main>
	    <Switch>
	      <Route exact path='/' component={NoteList}/>
	      <Route exact path='/new' component={CreateNote}/>
	      <Route exact path='/update/:id' component={EditNote}/>
	    </Switch>
	  </main>
    );
  }
}

export default Main;
