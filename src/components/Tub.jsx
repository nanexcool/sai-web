import React, { Component } from 'react';

class Tub extends Component {
  setTub = (e) => {
    e.preventDefault();
    this.props.setTub(this.tub.value);
  };
  render() {
    return (
      <div>
        <form ref={(input) => this.tubForm = input} onSubmit={(e) => this.setTub(e)} className="form-horizontal">
          <div className="box-body">
            <div className="form-group">
              <label htmlFor="tub-address" className="col-sm-2 control-label">Tub</label>
              <div className="col-sm-10">
                <input ref={(input) => this.tub = input} type="text" className="form-control"
                  id="tub-address" placeholder="Enter a Tub address"
                  defaultValue='0x9561c133dd8580860b6b7e504bc5aa500f0f06a7' />
              </div>
            </div>
          </div>

          <div className="box-footer">
            <button type="submit" className="btn btn-info pull-right">GO</button>
          </div>

        </form>
      </div>
    );
  }
}

export default Tub;
