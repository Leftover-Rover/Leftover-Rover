import React from 'react'
import { connect } from 'react-redux'
import { postOrder } from '../store'
import UserMap from './UserMap'

class Map extends React.Component {
  state = {
    origin: '',
    destination: '',
    centerLat: 41.8781,
    centerLng: -87.6298
  }
  componentDidUpdate(prevProps) {
    if (this.props.coords !== prevProps.coords) {
      this.setState({
        centerLng: this.props.coords.longitude,
        centerLat: this.props.coords.latitude
      })
    }
  }

  handleBook = () => {
    // These constants will take my lat/lng from my location for pickup location, I have hard coded them in the meantime.
    const myLat = -87.6298
    const myLng = 41.8781
    this.props.postOrder(myLat, myLng)
  }

  handleRoute = () => {
    this.setState({
      origin: '405 W Superior St. Chicago, IL 60654',
      destination: '3838 N Fremon St. Chicago, IL 60613'
    })
  }
  render() {
    return (
      <React.Fragment>
        <UserMap {...this.state} />
        <span className="renderOverMap">
          <button type="button" onClick={this.handleRoute}>
            Press ME
          </button>
          <button type="button" onClick={this.handleBook}>
            Book me a Route!
          </button>
        </span>
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  postOrder
}
export default connect(null, mapDispatch)(Map)
