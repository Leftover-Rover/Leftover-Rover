/* eslint-disable complexity */
import React from 'react'
import { connect } from 'react-redux'
import { postOrder, getMyLocation, updateOrderToCancelled } from '../store'
import UserMap from './UserMap'
import { Button, Grid } from 'semantic-ui-react'
import { EventEmitter } from 'events'

export const userEvent = new EventEmitter()

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

  handleBook = () => {
    let newOrder = {
      pickupLocationLat: this.props.myLocation.lat,
      pickupLocationLng: this.props.myLocation.lng,
      dropoffLocationLat: this.props.user.defaultDeliveryLat,
      dropoffLocationLng: this.props.user.defaultDeliveryLng,
      deliveryNotes: ''
    }
    this.props.postOrder(newOrder)
    userEvent.emit('orderRequested')
  }

  handleRoute = (origin, destination) => {
    this.setState({
      origin,
      destination,
      centerLat: (Number(origin[1]) + Number(destination[1])) / 2,
      centerLng: (Number(origin[0]) + Number(destination[0])) / 2,
      zoom: 12.8
    })

    this.markers = [origin, destination] //adding arrays of [lat,lng] will draw markers on the map
  }
  handleCancel = () => {
    this.props.updateOrderToCancelled(this.props.order.id)
  }

  render() {
    const orderExists = this.props.order.status
    const orderRequested = this.props.order.status === 'Requested'
    const orderToPickup = this.props.order.status === 'ToPickup'
    const orderToDropOff = this.props.order.status === 'ToDropOff'
    const orderCompleted = this.props.order.status === 'Completed'

    return (
      <React.Fragment>
        <Grid textAlign="center" style={{ height: '85vh' }}>
          <Grid.Row
            style={{
              height: '80%'
            }}
          >
            <UserMap
              {...this.state}
              markers={this.markers}
              style={{ width: '100%' }}
            />
          </Grid.Row>
          <Grid.Row
            style={{
              height: '20%'
            }}
          >
            {/* We will need to add conditionals here for different control bar, or handle it similarly to UserMap */}
            {this.props.user &&
              !this.props.user.defaultDeliveryLat &&
              !this.props.user.defaultDeliveryLng && (
                <>
                  <h4>
                    To book a Rover, complete your profile by adding a default
                    dropoff address!
                  </h4>
                  <Button
                    type="button"
                    as="a"
                    href="/me/update-dropoff"
                    size="large"
                    style={{
                      width: '90%',
                      margin: '1vw'
                    }}
                  >
                    Add Address {`&`} Get Rovin'
                  </Button>
                </>
              )}
            {!orderExists &&
              this.props.user.defaultDeliveryLat !== null &&
              this.props.user.defaultDeliveryLng !== null && (
                <Button
                  type="button"
                  onClick={this.handleBook}
                  size="large"
                  style={{
                    width: '90%',
                    margin: '1vw'
                  }}
                >
                  Book Me A Rover!
                </Button>
              )}
            {orderRequested && (
              <div>
                <h1>Lookin' For A Rover!</h1>
                <Button
                  type="button"
                  onClick={this.handleCancel}
                  size="large"
                  style={{
                    width: '90%',
                    margin: '1vw'
                  }}
                >
                  Cancel My Rover Request!
                </Button>
              </div>
            )}
            {orderToPickup && <h1>Your Rover Is On The Way!</h1>}
            {orderToDropOff && <h1>Your Rover Is Going To Drop Off!</h1>}
            {orderCompleted && (
              <div>
                <h1>Your Leftovers Have Been Dropped Off!</h1>{' '}
                <Button
                  type="button"
                  onClick={this.handleBook}
                  size="large"
                  style={{
                    width: '90%',
                    margin: '1vw'
                  }}
                >
                  Book Me A Rover!
                </Button>
              </div>
            )}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatch = {
  postOrder,
  getMyLocation,
  updateOrderToCancelled
}

const mapState = state => {
  return {
    order: state.order,
    myLocation: state.myLocation,
    user: state.user,
    driver: state.user.driver,
    actionItem: state.actionItem
  }
}

export default connect(mapState, mapDispatch)(Map)
