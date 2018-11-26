import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { UserTable, OrderTable } from './index'
import { fetchAllUsers, fetchOrders } from '../store'

class Admin extends Component {
  handleUsers = () => {
    this.props.fetchAllUsers()
  }

  handleOrders = () => {
    this.props.fetchOrders()
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
            <Button
              inverted
              as={Link}
              to="/admin/orders"
              content="Orders"
              onClick={this.handleOrders}
            />
          </div>
        </div>
        {this.props.location === 'users' && this.props.users.length ? (
          <UserTable users={this.props.users} />
        ) : (
          <></>
        )}
        {this.props.location === 'orders' && this.props.orders.length ? (
          <OrderTable orders={this.props.orders} />
        ) : (
          <></>
        )}
      </React.Fragment>
    )
  }
}

const mapState = (state, ownProps) => {
  const users = state.users
  const orders = state.orders
  const location = ownProps.location.pathname.slice(7)
  return { users, orders, location }
}

const mapDispatch = { fetchAllUsers, fetchOrders }

export default connect(mapState, mapDispatch)(Admin)
