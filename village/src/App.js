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
      error: '',
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => this.setState({ error: err.message }))
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => this.setState({ smurfs: res.data}))
      .catch(err => this.setState({ error: err.message }))
  }

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data}))
      .catch(err => this.setState({ error: err.message }))
  }
  
  render() {
    return (
      <div className="App">
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Form</NavLink>
        </nav>
      </header>
      {
        this.state.error.length > 0 ?
        <div className="error">
          <p>{this.state.error}</p>
          <button onClick={() => this.setState({ error: '' })}>close</button>
        </div> :
        null
      }
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
