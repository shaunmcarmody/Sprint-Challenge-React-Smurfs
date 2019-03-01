import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => this.setState({ smurfs: res.data}))
      .catch(err => console.log(err))
  }

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data}))
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Form</NavLink>
        </nav>
        <Route exact path="/" render={props => (
          <Smurfs {...props} deleteSmurf={this.deleteSmurf} smurfs={this.state.smurfs} />
        )}
        />
        <Route path ="/smurf-form" render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />} />
      </div>
    );
  }
}

export default App;
