import React, { Component } from 'react'
import { connect } from 'react-redux'

import {} from './index'

class Rover extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Add here anything that should render for the driver*/}
        <h1>Driver Page</h1>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return state
}

export default connect(mapState)(Rover)