/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import {
  getMyLocation,
  updateDriver,
  driverAcceptOrder,
  updateOrderToDropOff,
  updateOrderToCompleted,
  updateOrderToEmpty,
  updateActionItem
} from '../store'
import DriverMap from './DriverMap'
import { Button, Grid } from 'semantic-ui-react'

import { orderInfo } from '../socket'
import DriverUserItem from './DriverUserItem'

class Map extends React.Component {
  state = {
    origin: '',
    destination: '',
    centerLat: 41.8781,
    centerLng: -87.6298,
    zoom: 13.4,
    status: '',
    user: {}
  }

  componentDidMount() {
    const options = {
      timeout: 3000,
      enableHighAccuracy: true
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

  componentDidUpdate(prevProps) {
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
    const { lat, lng } = prevProps.myLocation
    const { status } = this.props.order
    if (
      (status === 'ToPickup' && lat !== this.props.myLocation.lat) ||
      (status === 'ToPickup' && lng !== this.props.myLocation.lng) ||
      (status === 'ToDropOff' && lat !== this.props.myLocation.lat) ||
      (status === 'ToDropOff' && lng !== this.props.myLocation.lng)
    ) {
      this.setState({
        origin: [this.props.myLocation.lng, this.props.myLocation.lat]
      })
      this.handleRoute(
        [this.props.myLocation.lng, this.props.myLocation.lat],
        this.state.destination
      )
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
    this.setState({ user: orderInfo.orderForDriver.user })
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
    const { deliveryLocationLng, deliveryLocationLat } = this.props.order

    const newOrigin = [this.props.myLocation.lng, this.props.myLocation.lat]
    const newDest = [deliveryLocationLng, deliveryLocationLat]
    this.handleRoute(newOrigin, newDest)
  }

  changeToCompleted = () => {
    this.props.updateOrderToCompleted(
      this.props.order.id,
      this.props.order.userId
    )
    this.setState({
      origin: '',
      destination: '',
      status: 'completed',
      centerLat: this.props.myLocation.lat,
      centerLng: this.props.myLocation.lng,
      user: {}
    })
  }

  handleDriverRestart = async () => {
    await this.props.updateActionItem()
    await this.props.updateOrderToEmpty()
    await this.props.updateDriver(this.props.driverId, {
      isAvailable: true
    })
    this.setState({ status: '' })
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
              height: '15%'
            }}
          >
            {!this.props.actionItem &&
              !orderExists && <h1>Lookin' For A Rover request</h1>}

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
          {this.state.user.id && (
            <Grid.Row
              style={{
                height: '25%'
              }}
            >
              <DriverUserItem user={this.state.user} />
            </Grid.Row>
          )}
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
  updateOrderToEmpty,
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
