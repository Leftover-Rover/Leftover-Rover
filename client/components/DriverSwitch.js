import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Segment } from 'semantic-ui-react'
import { updateDriver, fetchLoggedinUser } from '../store'
import { withRouter } from 'react-router-dom'
import { EventEmitter } from 'events'

export const driverEvent = new EventEmitter()

class DriverSwitch extends Component {
  constructor() {
    super()
    this.state = { isChecked: false }
  }

  componentDidMount() {
    if (this.props.driver) {
      this.setState({ isChecked: this.props.driver.isActive })
    }
  }

  handleChange = () => {
    !this.props.driver.isActive && driverEvent.emit('driverIsActive')
    this.props.history.push(!this.props.driver.isActive ? '/rover' : '/me')
    this.props.updateDriver(this.props.driver.id, {
      isActive: !this.props.driver.isActive,
      isAvailable: true
    })
    this.setState({ isChecked: !this.state.isChecked })
  }
  render() {
    const { isActive } = this.props.driver
    if (this.props.driver) {
      return (
        <Segment inverted color="orange">
          <Checkbox
            toggle
            onChange={this.handleChange}
            label={
              this.props.driver.isActive ? 'Stop Roving!' : 'Start Roving!'
            }
            checked={isActive}
          />
        </Segment>
      )
    } else {
      return <div />
    }
  }
}

const mapDispatch = dispatch => {
  return {
    updateDriver: (driverId, driver) => {
      dispatch(updateDriver(driverId, driver))
    },
    fetchLoggedinUser: userId => {
      dispatch(fetchLoggedinUser(userId))
    }
  }
}

const mapState = (state, ownProps) => {
  return {
    order: state.order,
    driver: state.user.driver,
    history: ownProps.history
  }
}

export default withRouter(connect(mapState, mapDispatch)(DriverSwitch))
