import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Rover,
  Me,
  AddDefaultAddress,
  SidebarMenu,
  UserProfile,
  UpdateUserProfile,
  Admin
} from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isDriver, isAdmin } = this.props

    return (
      <React.Fragment>
        <SidebarMenu className="renderOverMap" />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            exact
            path="/me/default-dropoff"
            component={AddDefaultAddress}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route
                exact
                path="/me/update-dropoff"
                component={AddDefaultAddress}
              />
              <Route exact path="/me/profile" component={UserProfile} />
              <Route
                exact
                path="/me/profile/edit"
                component={UpdateUserProfile}
              />
              <Route path="/me" component={Me} />
              {isDriver && (
                <Switch>
                  {/* Routes placed here are only available for drivers */}
                  <Route path="/rover" component={Rover} />
                </Switch>
              )}
              {isAdmin && (
                <Switch>
                  {/* Routes placed here are only available for admins */}
                  <Route path="/admin" component={Admin} />
                </Switch>
              )}
              <Route component={Me} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route exact path="/" render={() => <Redirect to="/me" />} />
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
    isDriver: !!state.user.driver,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
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
