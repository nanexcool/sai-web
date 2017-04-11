import React, { Component } from 'react';
import web3, { initWeb3 } from '../web3';
import Main from './Main';
import NoConnection from './NoConnection';

class App extends Component {
  constructor() {
    super();
    this.state = {
      connected: false,
      connecting: true,
      defaultAccount: null,
    };
  }
  componentDidMount() {
    setTimeout(this.init, 500);
  }
  init = () => {
    this.setState({ connecting: true });
    initWeb3(web3);
    web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        clearInterval(this.interval);
        const defaultAccount = accounts[0];
        web3.eth.defaultAccount = defaultAccount;
        this.setState({
          connected: true,
          connecting: false,
          defaultAccount
        });
      } else {
        this.setState({ connecting: false });
        //this.interval = setInterval(this.init, 5000);
      }
    });
  }
  toggle = () => {
    const connected = !this.state.connected;
    this.setState({ connected });
  }
  render() {
    return (
      <div>
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

          {this.state.connecting ?
            <NoConnection connecting={this.state.connecting} /> :
            (this.state.connected ?
              <Main coinbase={this.state.defaultAccount} /> :
              <NoConnection connecting={this.state.connecting} />)
          }

        </section>
      </div>
    );
  }
}

export default App;

window.l = console.log;
