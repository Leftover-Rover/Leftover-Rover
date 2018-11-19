import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox } from 'semantic-ui-react'
import { updateDriver, fetchLoggedinUser } from '../store'
import { Link } from 'react-router-dom'

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
    this.props.updateDriver(this.props.driver.id, {
      isActive: !this.props.driver.isActive,
      isAvailable: true
    })
    this.setState({ isChecked: !this.state.isChecked })
  }
  render() {
    if (this.props.driver) {
      return this.props.driver.isActive ? (
        <Link to="/me">
          <Checkbox
            toggle
            onChange={this.handleChange}
            label="Rove!"
            defaultChecked
          />
        </Link>
      ) : (
        <Link to="/rover">
          <Checkbox toggle onChange={this.handleChange} label="Rove!" />
        </Link>
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

const mapState = state => {
  return {
    order: state.order,
    driver: state.loggedinUser.driver
  }
}

export default connect(mapState, mapDispatch)(DriverSwitch)
