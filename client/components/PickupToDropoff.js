import React, { Component } from 'react'
import UserMap from './UserMap'

export class PickupToDropoff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: [],
      destination: [],
      centerLat: 41.8781,
      centerLng: -87.6298
    }
  }

  render() {
    if (this.state.origin.length < 1) return <div />
    return (
      <UserMap
        origin={this.state.origin}
        destination={this.state.destination}
      />
    )
  }
}

export default PickupToDropoff
