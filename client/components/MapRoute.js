import React from 'react'
import { connect } from 'react-redux'
import { postOrder, getMyLocation } from '../store'
import UserMap from './UserMap'

class Map extends React.Component {
  state = {
    origin: '',
    destination: '',
    centerLat: 41.8781,
    centerLng: -87.6298
  }

  componentDidMount() {
    const options = {
      timeout: 30000
    }
    this.watch = navigator.geolocation.watchPosition(
      this.props.getMyLocation,
      err => console.log(err),
      options
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch)
  }

  handleBook = () => {
    // These constants will take my lat/lng from my location for pickup location, I have hard coded them in the meantime.
    let newOrder = {
      pickupLocationLat: this.props.myLocation.lat,
      pickupLocationLng: this.props.myLocation.lng,
      dropoffLocationLat: this.props.user.defaultDeliveryLat,
      dropoffLocationLng: this.props.user.defaultDeliveryLng,
      deliveryNotes: ''
    }
    this.props.postOrder(newOrder)
  }

  handleRoute = (origin, destination) => {
    this.setState({
      origin,
      destination
    })
    this.markers = [] //adding arrays of [lat,lng] will draw markers on the map
  }

  render() {
    return (
      <React.Fragment>
        <span className="renderOverMap">
          <button type="button" onClick={this.handleBook} className="button">
            Book me a Route!
          </button>
        </span>
        <UserMap {...this.state} markers={this.markers} />
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  postOrder,
  getMyLocation
}

const mapState = state => {
  return {
    order: state.order,
    myLocation: state.myLocation,
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Map)
