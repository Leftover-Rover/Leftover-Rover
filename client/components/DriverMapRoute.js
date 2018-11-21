import React from 'react'
import { connect } from 'react-redux'
import { postOrder, getMyLocation, updateDriver } from '../store'
import DriverMap from './DriverMap'
import { Button, Grid } from 'semantic-ui-react'
import DriverSwitch from './DriverSwitch'

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
      timeout: 3000
    }
    this.watch = navigator.geolocation.watchPosition(
      pos => {
        this.props.getMyLocation(pos)
        this.props.updateDriver(this.props.driverId, {
          currentLocationLat: pos.coords.latitude,
          currentLocationLng: pos.coords.longitude
        })
      },
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
        <Grid textAlign="center" style={{ height: '85vh' }}>
          <Grid.Row
            style={{
              height: '80%'
            }}
          >
            <DriverMap {...this.state} markers={this.markers} />
          </Grid.Row>
          <Grid.Row
            style={{
              backgroundColor: 'orange',
              height: '20%'
            }}
          >
            <p>Buttons and Messages Will Go Here</p>
            <DriverSwitch />
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  postOrder,
  getMyLocation,
  updateDriver
}

const mapState = state => {
  return {
    order: state.order,
    myLocation: state.myLocation,
    user: state.user,
    driverId: state.loggedinUser.driver.id
  }
}

export default connect(mapState, mapDispatch)(Map)
