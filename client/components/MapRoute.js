import React from 'react'
import { connect } from 'react-redux'
import { postOrder, getMyLocation } from '../store'
import UserMap from './UserMap'
import { geolocated } from 'react-geolocated'

class Map extends React.Component {
  state = {
    origin: '',
    destination: '',
    centerLat: 41.8781,
    centerLng: -87.6298
  }
  componentDidUpdate(prevProps) {
    // const options = {
    //   enableHighAccuracy: false,
    //   timeout: 10000,
    //   maximumAge: 3000
    // }
    setTimeout(
      () =>
        navigator.geolocation.getCurrentPosition(
          this.props.getMyLocation,
          err => console.log(err)
          // options
        ),
      2000
    )

    if (this.props.coords !== prevProps.coords) {
      this.setState({
        centerLng: this.props.coords.longitude,
        centerLat: this.props.coords.latitude
      })
    }
  }

  handleBook = () => {
    // These constants will take my lat/lng from my location for pickup location, I have hard coded them in the meantime.
    const myLat = this.state.centerLat
    const myLng = this.state.centerLng
    this.props.postOrder(myLat, myLng)
  }

  handleRoute = (origin, destination) => {
    this.setState({
      origin,
      destination
    })
  }
  render() {
    return (
      <React.Fragment>
        <span className="renderOverMap">
          <button type="button" onClick={this.handleBook} className="button">
            Book me a Route!
          </button>
        </span>
        <UserMap {...this.state} {...this.props.myLocation} />
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
    myLocation: state.myLocation
  }
}

export default connect(mapState, mapDispatch)(Map)
