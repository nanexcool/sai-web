import React, { Component } from 'react';
import web3 from './web3';
import Main from './components/Main';
import NoConnection from './components/NoConnection';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      connected: false
    };
  }
  componentDidMount() {
    setTimeout(this.init, 500);
  }
  init = () => {
    web3.setProvider(window.web3.currentProvider);
    this.setState({ connected: true });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.connected ? <Main /> : <NoConnection />}
      </div>
    );
  }
}

export default App;
