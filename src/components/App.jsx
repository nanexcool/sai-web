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
    web3.eth.getAccounts((error, accounts) => {
      const defaultAccount = accounts[0];
      web3.eth.defaultAccount = defaultAccount;
      this.setState({
        connected: true,
        defaultAccount
      });
    });
  }
  toggle = () => {
    const connected = !this.state.connected;
    this.setState({ connected });
  }
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Sai Web
            <small>Version 1.0 <button onClick={this.toggle}>Toggle to connect or disconnect</button></small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>

        <section className="content">

          {this.state.connected ? <Main coinbase={this.state.defaultAccount} /> : <NoConnection />}

        </section>
      </div>
    );
  }
}

export default App;

window.l = console.log;
