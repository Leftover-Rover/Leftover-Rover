/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import {
  getMyLocation,
  updateDriver,
  driverAcceptOrder,
  updateOrderToDropOff,
  updateOrderToCompleted,
  updateDriverIsAvailable,
  updateActionItem
} from '../store'
import DriverMap from './DriverMap'
import { Button, Grid } from 'semantic-ui-react'

import { orderInfo } from '../socket'

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

  handleBook = () => {
    const id = orderInfo.orderForDriver.id
    const origin = [this.props.myLocation.lng, this.props.myLocation.lat]
    const destination = [
      orderInfo.orderForDriver.pickupLocationLng,
      orderInfo.orderForDriver.pickupLocationLat
    ]
    this.props.updateDriver(this.props.driverId, {
      isAvailable: false
    })
    this.props.driverAcceptOrder(id, orderInfo.driverList)
    this.handleRoute(origin, destination)
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

  changeToDropOff = () => {
    this.props.updateOrderToDropOff(this.props.order.id)
    const {
      pickupLocationLng,
      pickupLocationLat,
      deliveryLocationLng,
      deliveryLocationLat
    } = this.props.order

    const newOrigin = [pickupLocationLng, pickupLocationLat]
    const newDest = [deliveryLocationLng, deliveryLocationLat]
    this.handleRoute(newOrigin, newDest)
  }

  changeToCompleted = () => {
    this.props.updateOrderToCompleted(this.props.order.id)
    this.setState({
      origin: '',
      destination: ''
    })
  }

  handleDriverRestart = async () => {
    await this.props.updateActionItem()
    await this.props.updateDriverIsAvailable()
    await this.props.updateDriver(this.props.driverId, {
      isAvailable: true
    })
  }

  render() {
    const orderExists = !!this.props.order.id
    const ToPickup = this.props.order.status === 'ToPickup'
    const ToDropOff = this.props.order.status === 'ToDropOff'
    const completed = this.props.order.status === 'Completed'

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
            {!this.props.actionItem &&
              !orderExists && <h1>Lookin' for a Rover request</h1>}

            {this.props.actionItem &&
              !orderExists && (
                <Button
                  type="button"
                  onClick={this.handleBook}
                  size="large"
                  style={{ width: '90%', margin: '1vw' }}
                >
                  Do you want this Rover?
                </Button>
              )}
            {ToPickup && (
              <Button
                type="button"
                onClick={this.changeToDropOff}
                size="large"
                style={{
                  width: '90%',
                  margin: '1vw'
                }}
              >
                Leftovers Have Been Picked Up!
              </Button>
            )}
            {ToDropOff && (
              <Button
                type="button"
                onClick={this.changeToCompleted}
                size="large"
                style={{
                  width: '90%',
                  margin: '1vw'
                }}
              >
                Leftovers Have Been Delivered!
              </Button>
            )}
            {completed && (
              <Button
                type="button"
                onClick={this.handleDriverRestart}
                size="large"
                style={{
                  width: '90%',
                  margin: '1vw'
                }}
              >
                Look For New Leftovers!
              </Button>
            )}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  getMyLocation,
  updateDriver,
  driverAcceptOrder,
  updateOrderToDropOff,
  updateOrderToCompleted,
  updateDriverIsAvailable,
  updateActionItem
}

const mapState = state => {
  return {
    order: state.order,
    myLocation: state.myLocation,
    user: state.user,
    driverId: state.user.driver.id,
    actionItem: state.actionItem
  }
}

export default connect(mapState, mapDispatch)(Map)
