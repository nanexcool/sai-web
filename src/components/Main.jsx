import React from 'react';
import Token from './Token';
import Medianizer from './Medianizer';
import web3 from '../web3';
import AnimatedNumber from 'react-animated-number';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: 0
    }
  }
  componentDidMount() {
    this.checkBalance();
    this.interval = setInterval(this.checkBalance, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  checkBalance = () => {
    web3.eth.getBalance(web3.eth.coinbase, (error, res) => {
      const balance = web3.fromWei(res).toNumber();
      if (balance !== this.state.balance) {
        this.setState({ balance });
      }
    })
  }
  render() {
    const weth = '0x53eccc9246c1e537d79199d0c7231e425a40f896';
    return (
      <div>
        <div className="row">

          <Token name="SAI"
            description="Stablecoin"
            address={weth}
            color='bg-aqua' />
          <Token name="SIN"
            description="Debt (Negative Sai)"
            address={weth}
            color='bg-red' />
          <Token name="SKR"
            description="Vote/Lock Collateral"
            address={weth}
            color='bg-green' />
          <Token name="POT"
            description="Token Vault"
            address={weth} />

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
                    <p className="text-center">
                      <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                    </p>
                    <p>{web3.eth.coinbase}</p>
                    <AnimatedNumber value={this.state.balance}
                      style={{
                        transition: '0.8s ease-out',
                        fontSize: 48,
                        transitionProperty:
                        'background-color, color, opacity'
                      }}
                      frameStyle={perc => (
                        perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
                      )}
                      duration={300}
                      formatValue={n => n} />
                  </div>
                </div>
              </div>

            </div>

          </div>
          <Medianizer />
        </div>
      </div >
    )
  }
}

export default Main;
