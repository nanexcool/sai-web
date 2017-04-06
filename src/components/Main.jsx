import React from 'react';
import web3 from '../web3';
import AnimatedNumber from 'react-animated-number';

class Main extends React.Component {
    render() {
        return (
            <div>
                <p>{web3.eth.coinbase}</p>
                <AnimatedNumber value={95.8}
                style={{
                    transition: '0.8s ease-out',
                    fontSize: 48,
                    transitionProperty:
                        'background-color, color, opacity'
                }}
                frameStyle={perc => (
                    perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                )}
                duration={300}
                formatValue={n => n}/>
            </div>
        )
    }
}

export default Main;
