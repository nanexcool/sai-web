import React, { Component } from 'react';
import web3, { initWeb3 } from '../web3';
import Main from './Main';
import NoConnection from './NoConnection';

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
      <div>
        <p>
          <button onClick={this.toggle}>Toggle to connect or disconnect</button>
        </p>
        {this.state.connected ? <Main /> : <NoConnection />}
      </div>
    );
  }
}

export default App;

window.l = console.log;
