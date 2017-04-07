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
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className={`info-box-icon ${this.props.color}`}>
            {this.props.name}
          </span>

          <div className="info-box-content">

            <span className="info-box-number">
              Total: <AnimatedNumber value={this.state.totalSupply} stepPrecision={4}/>
            </span>
            <span className="info-box-number">
              Yours: <AnimatedNumber value={this.state.balance} stepPrecision={4}/>
            </span>
            <span className="info-box-number">
              Tub: <AnimatedNumber value={this.state.balance} stepPrecision={4}/>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Token;
