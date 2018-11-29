/* eslint-disable complexity */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader, Table } from 'semantic-ui-react'
import { fetchAllOrders } from '../store/orderHistory'

class OrdersList extends Component {
  constructor() {
    super()
    this.state = {
      usersOrders: []
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.user &&
      this.props.user.id &&
      this.props.user !== prevProps.user
    ) {
      await this.props.fetchAllOrders(this.props.user)
      this.setState({ usersOrders: this.props.orderHistory })
    }
  }

  render() {
    if (
      this.props.user &&
      this.state.usersOrders &&
      this.state.usersOrders.length &&
      this.state.usersOrders.length > 0
    ) {
      const orders = this.state.usersOrders

      const orderStatus = status => {
        if (status === 'Requested') return 'Requested'
        if (status === 'ToPickUp') return 'To Pick Up'
        if (status === 'ToDropOff') return 'To Drop Off'
        if (status === 'Completed') return 'Completed'
        if (status === 'Cancelled') return 'Cancelled'
      }

      return (
        <>
          <h1
            style={{
              textAlign: 'center',
              padding: '2%',
              margin: '2%'
            }}
          >
            Your Order History
          </h1>
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              padding: '1%',
              margin: '1%'
            }}
          >
            <Table
              attached="top"
              basic
              unstackable
              celled
              style={{ width: '90vw' }}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Pick Up
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Driver</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Delivery Time
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.map(order => {
                  return (
                    <Table.Row key={order.id}>
                      <Table.Cell textAlign="center">{order.id}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {order.createdAt.slice(0, 10)}
                      </Table.Cell>
                      {order.pickupLocationLat === null ||
                      order.pickupLocationLat === undefined ||
                      order.pickupLocationLng === null ||
                      order.pickupLocationLng === undefined ? (
                        <Table.Cell textAlign="center">N/A</Table.Cell>
                      ) : (
                        <Table.Cell textAlign="center">
                          {String(order.pickupLocationLat).slice(0, 6)},{' '}
                          {String(order.pickupLocationLng).slice(0, 6)}
                        </Table.Cell>
                      )}
                      {order.driver !== null && order.driver.user !== null ? (
                        <Table.Cell textAlign="center">
                          {`${order.driver.user.name
                            .slice(0, 1)
                            .toUpperCase()}${order.driver.user.name.slice(
                            1,
                            order.driver.user.name.indexOf(' ')
                          )} ${order.driver.user.name
                            .slice(
                              order.driver.user.name.indexOf(' ') + 1,
                              order.driver.user.name.indexOf(' ') + 2
                            )
                            .toUpperCase()}${order.driver.user.name.slice(
                            order.driver.user.name.indexOf(' ') + 2
                          )}`}
                        </Table.Cell>
                      ) : (
                        <Table.Cell textAlign="center">N/A</Table.Cell>
                      )}
                      {order.deliveryTime === null ||
                      order.deliveryTime === undefined ? (
                        <Table.Cell textAlign="center">N/A</Table.Cell>
                      ) : (
                        <Table.Cell textAlign="center">
                          {order.deliveryTime.slice(11, 16).replace('T', ' ')}
                        </Table.Cell>
                      )}
                      <Table.Cell textAlign="center">
                        {orderStatus(order.status)}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              paddingTop: '5%',
              marginTop: '5%'
            }}
          >
            <h1>Searching For Order History Data</h1>
            <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
              <Loader active inline="centered" />
            </div>
          </div>
        </>
      )
    }
  }
}

const mapState = state => {
  return { user: state.user, orderHistory: state.orderHistory }
}

const mapDispatch = { fetchAllOrders }

export default connect(mapState, mapDispatch)(OrdersList)
