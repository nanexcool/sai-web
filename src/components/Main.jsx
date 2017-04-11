import React from 'react';
import Tub from './Tub';
import Token from './Token';
import Medianizer from './Medianizer';
import web3 from '../web3';
import AnimatedNumber from 'react-animated-number';

var dstub = require('../config/tub');
window.dstub = dstub;

var dstoken = require('../config/dstoken');
window.dstoken = dstoken;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      tub: {
        address: null,
        tokens: {
          gem: {},
          sai: {},
          sin: {},
          skr: {},
          pot: {}
        },
      },
    };
  }
  componentDidMount() {
    this.checkBalance();
    this.interval = setInterval(this.checkBalance, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  checkBalance = () => {
    web3.eth.getBalance(this.props.coinbase, (error, res) => {
      const balance = web3.fromWei(res).toNumber();
      if (balance !== this.state.balance) {
        this.setState({ balance });
      }
    });
  };
  setTub = (address) => {
    if (web3.isAddress(address)) {
      const tub = web3.eth.contract(dstub.abi).at(address);
      window.tub = tub;
      ['gem','sai','sin','skr','pot'].forEach(x => {
        tub[x]((e,r) => {
          console.log({[x]: r});
          const tubState = {...this.state.tub};
          tubState.tokens[x] = r;
          this.setState({ tub: tubState });
          window[x] = web3.eth.contract(dstoken.abi).at(r);
        });
      });
      const tubState = {...this.state.tub};
      tubState.address = address;
      this.setState({ tub: tubState });
      // tub.address = address;
      // this.setState({ tub: tubState });
    } else {
      console.log('Not an address...');
    }
  };
  render() {
    //const weth = '0x53eccc9246c1e537d79199d0c7231e425a40f896';
    const tokens = this.state.tub.tokens;
    const showTokens = this.state.tub.address ? 'true' : false;
    return (
      <div>
        <div className="row">
          {this.state.tub.address &&
          <div>
            <Token name="GEM"
              description="Raw Collateral"
              address={tokens.gem}
              tub={this.state.tub.address}
              account={this.props.coinbase}
              color='bg-' />
            <Token name="SKR"
              description="Vote/Lock Collateral"
              address={tokens.skr}
              tub={this.state.tub.address}
              account={this.props.coinbase}
              color='bg-aqua' />
            <Token name="SAI"
              description="Stablecoin"
              address={tokens.sai}
              tub={this.state.tub.address}
              account={this.props.coinbase}
              color='bg-green' />
            <Token name="SIN"
              description="Debt (Negative Sai)"
              address={tokens.sin}
              tub={this.state.tub.address}
              account={this.props.coinbase}
              color='bg-red' />
            </div>
          }
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Overview</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <p>Your account: <strong>{this.props.coinbase}</strong></p>
                    <p>
                      Your balance: <strong><AnimatedNumber value={this.state.balance} /> ETH</strong>
                    </p>

                    <Tub setTub={this.setTub} />

                  </div>
                </div>
              </div>

            </div>

          </div>
          {/*<Medianizer />*/}

        </div>
      </div >
    )
  }
}

export default Main;
