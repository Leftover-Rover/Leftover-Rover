import React from 'react'
import { connect } from 'react-redux'
import { postOrder, getMyLocation } from '../store'
import DriverMap from './DriverMap'

class Map extends React.Component {
  state = {
    origin: '',
    destination: '',
    centerLat: 41.8781,
    centerLng: -87.6298,
    zoom: 14
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

  componentDidUpdate() {
    if (!this.props.order.status && this.props.myLocation.lat) {
      this.markers = [[this.props.myLocation.lng, this.props.myLocation.lat]]
      if (
        this.state.centerLat !== this.props.myLocation.lat ||
        this.state.centerLng !== this.props.myLocation.lng
      ) {
        this.setState({
          centerLat: this.props.myLocation.lat,
          centerLng: this.props.myLocation.lng
        })
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch)
  }

  handleRoute = (origin, destination) => {
    this.setState({
      origin,
      destination,
      centerLat: (Number(origin[1]) + Number(destination[1])) / 2,
      centerLng: (Number(origin[0]) + Number(destination[0])) / 2,
      zoom: 13
    })

    this.markers = [origin, destination] //adding arrays of [lat,lng] will draw markers on the map
  }

  render() {
    return (
      <React.Fragment>
        <DriverMap {...this.state} markers={this.markers} />
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
