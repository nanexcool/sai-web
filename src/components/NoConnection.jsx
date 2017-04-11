import React from 'react';

const NoConnection = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        {props.connecting ?
        <div className="callout callout-info">
          <h4>Connecting to Ethereum</h4>
          <p>Please wait a few seconds...</p>
        </div>
        :
        <div className="callout callout-warning">
          <h4>No connection to Ethereum</h4>
          <p>Please use Parity, Metamask or a local node at <strong>http://localhost:8545</strong></p>
          <p>Reload this page when ready</p>
        </div>
        }
      </div>
    </div>
  )
}

export default NoConnection;
