import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import web3 from '../web3';
var dsvalue = require('../config/dsvalue');

class Medianizer extends Component {
  constructor() {
    super();
    this.state = {
      median: 0,
      address: '0xe8b1baec3656d54e1086ae3a6e762e822fc5ab7d',
      caches: [
        {
          address: '0x47f709071d1495a9fcfa76d88ec7befb2f2f75c6',
          value: null,
        },
        {
          address: '0x5a1f57e499f24a64d9051f063ddd2f9539b1cb85',
          value: null,
        },
        {
          address: '0xa7a4f23a468b5bc275d674695213ae6d620dc910',
          value: null,
        },
      ]
    };
    this.dsvalue = web3.eth.contract(dsvalue.abi).at(this.state.address);
    window.dsvalue = this.dsvalue;
  }

  componentDidMount() {
    this.dsvalue.peek((error, result) => {
      if (!error) {
        console.log(result);
        const median = web3.toDecimal(web3.fromWei(result[0]));
        this.setState({ median });
      } else {
        console.log(error);
      }
    });
    this.state.caches.forEach((x, k) => this.read(k, x.address));
  }

  read(key, address) {
    const c = web3.eth.contract(dsvalue.abi).at(address);
    c.peek((error, result) => {
      if (!error) {
        const value = web3.toDecimal(web3.fromWei(result[0]));
        const caches = this.state.caches;
        caches[key].value = value;
        this.setState({ caches });
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Medianizer</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center">
                  <strong>Medianizer</strong>
                </p>
                <p>
                  Last value: <span className="badge bg-green">
                  <AnimatedNumber value={this.state.median} stepPrecision={4} /></span>
                </p>
                <p>
                  <a href={`https://kovan.etherscan.io/address/${this.state.address}`} target="_blank">{this.state.address}</a>
                </p>
                <h3>Retrieved median from:</h3>

                <table className="table">
                  <tbody>
                    <tr>
                      <th style={{ width: 10 + 'px' }}>#</th>
                      <th>Address</th>
                      <th style={{ width: 50 + 'px' }}>Value</th>
                    </tr>
                    {this.state.caches.map((x, k) =>
                      <tr key={k}>
                        <td>{k + 1}.</td>
                        <td>
                          <a href={`https://kovan.etherscan.io/address/${x.address}`} target="_blank">{x.address.substr(0,20)}...</a>
                        </td>
                        <td className="text-right">
                          <span className="badge bg-green">{x.value}</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Medianizer;
