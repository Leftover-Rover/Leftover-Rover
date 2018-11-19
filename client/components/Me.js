import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MapRoute } from './index'

class Me extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Add here anything that should render for the user*/}
        <MapRoute markers={this.markers} />
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return state
}

export default connect(mapState)(Me)
