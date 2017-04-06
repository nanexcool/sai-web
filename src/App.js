import React, { Component } from 'react';
import web3, { initWeb3 } from './web3';
import Main from './components/Main';
import NoConnection from './components/NoConnection';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      connected: false,
      defaultAccount: null,
    };
  }
  componentDidMount() {
    setTimeout(this.init, 500);
  }
  init = () => {
    initWeb3(web3);
    const defaultAccount = web3.eth.accounts[0];
    web3.eth.defaultAccount = defaultAccount;
    this.setState({
      connected: true,
      defaultAccount
    });
  }
  toggle = () => {
    const connected = !this.state.connected;
    this.setState({ connected });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <button onClick={this.toggle}>Toggle to connect or disconnect</button>
        </p>
        {this.state.connected ? <Main /> : <NoConnection />}
      </div>
    );
  }
}

export default App;

window.l = console.log;
