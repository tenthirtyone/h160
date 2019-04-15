import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TxInfo.scss'

export default class TxInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'hidden'
    }
  }

  toggleDisplay = () => {
    if (this.state.display === 'hidden') {
      this.setState({
        display: ''
      })
    } else {
      this.setState({
        display: 'hidden'
      })
    }
  }

  render() {
    return (
      <div className="tx-info item" onClick={this.toggleDisplay}>
        <div>
          {this.props.tx.hash}
        </div>        
        <table className={this.state.display}>                
          { this.props.tx.out.map(output => 
            <tbody key={output.script}>
              <tr>
                <td>
                      address:
                </td>
                <td>
                  {output.addr}
                </td>
              </tr>
              <tr>                      
                <td>
                      script:
                </td>
                <td>
                  {output.script}
                </td>
              </tr>
              <tr>                      
                <td>
                      value:
                </td>
                <td>
                  {output.value}
                </td>
              </tr>
            </tbody>
          )}                
        </table>
      </div>    
    )
  }
}

TxInfo.propTypes = {
  tx: PropTypes.object
}