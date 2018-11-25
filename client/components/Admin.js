import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { UserTable } from './index'
import { fetchAllUsers } from '../store'

class Admin extends Component {
  handleUsers = () => {
    this.props.fetchAllUsers()
  }

  render() {
    return (
      <React.Fragment>
        <div className="admin">
          <h1>Admin Dashboard</h1>
          <div>
            <Button
              inverted
              as={Link}
              to="/admin/users"
              content="User"
              onClick={this.handleUsers}
            />
            <Button inverted as={Link} to="/admin/drivers" content="Driver" />
            <Button inverted as={Link} to="/admin/orders" content="Orders" />
          </div>
        </div>
        {this.props.location === 'users' && this.props.users.length ? (
          <UserTable users={this.props.users} />
        ) : (
          <></>
        )}
      </React.Fragment>
    )
  }
}

const mapState = (state, ownProps) => {
  const users = state.users
  const location = ownProps.location.pathname.slice(7)
  return { users, location }
}

const mapDispatch = { fetchAllUsers }

export default connect(mapState, mapDispatch)(Admin)
