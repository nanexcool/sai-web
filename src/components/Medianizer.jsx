import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import web3 from '../web3';
var dsvalue = require('../config/dsvalue');

class Medianizer extends Component {
  constructor() {
    super();
    this.state = {
      median: 0
    }
    this.address = '0xe8b1baec3656d54e1086ae3a6e762e822fc5ab7d'
    this.m = web3.eth.contract(dsvalue.abi).at(this.address);
  }

  componentDidMount() {
    this.m.peek((error, result) => {
      if (!error) {
        const median = web3.toDecimal(web3.fromWei(result[0]));
        this.setState({ median });
      } else {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Medianizer</h1>
        <h2>{this.address}</h2>
        <AnimatedNumber value={this.state.median}
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

export default Medianizer;
