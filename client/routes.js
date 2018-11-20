import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Rover,
  Me,
  AddDefaultAddress,
  SidebarMenu
} from './components'
import { me, fetchLoggedinUser } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // Necessary to get isDriver
    if (this.props.user.id && !this.props.loggedinUser.id) {
      this.props.fetchLoggedinUser(this.props.user.id)
    }
    const { isLoggedIn } = this.props
    const { isDriver } = this.props

    return (
      <React.Fragment>
        <SidebarMenu className="renderOverMap" />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/me" component={Me} />
              <Route
                exact
                path="/me/default-dropoff"
                component={AddDefaultAddress}
              />
              {isDriver && (
                <Switch>
                  <Route path="/rover" component={Rover} />
                </Switch>
              )}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    loggedinUser: state.loggedinUser,
    isDriver: !!state.loggedinUser.driver
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchLoggedinUser: userId => {
      dispatch(fetchLoggedinUser(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
