import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import web3 from '../web3';
var dstoken = require('../config/dstoken');

class Token extends Component {
  constructor() {
    super();
    this.state = {
      totalSupply: 0,
      balance: 0
    }
  }

  componentDidMount() {
    this.token = web3.eth.contract(dstoken.abi).at(this.props.address);
    window[this.props.name.toLowerCase()] = this.token;
    this.token.totalSupply((error, result) => {
      if (!error) {
        const totalSupply = web3.toDecimal(web3.fromWei(result));
        this.setState({ totalSupply });
      } else {
        console.log(error);
      }
    })
    this.token.balanceOf(web3.eth.coinbase, (error, result) => {
      if (!error) {
        const balance = web3.toDecimal(web3.fromWei(result));
        this.setState({ balance });
      } else {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <h1>{this.props.name} Token</h1>
        <h2>{this.props.address}</h2>
        Total Supply: <AnimatedNumber value={this.state.totalSupply}
          style={{
            transition: '0.8s ease-out',
            fontSize: 48,
            transitionProperty:
            'background-color, color, opacity'
          }}
          frameStyle={perc => (
            perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
          )}
          stepPrecision={4}
          duration={300}
          formatValue={n => n} />
        <br/>
        My Balance: <AnimatedNumber value={this.state.balance}
          style={{
            transition: '0.8s ease-out',
            fontSize: 48,
            transitionProperty:
            'background-color, color, opacity'
          }}
          frameStyle={perc => (
            perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
          )}
          stepPrecision={4}
          duration={300}
          formatValue={n => n} />
      </div>
    )
  }
}

export default Token;
