import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

const OrderTable = props => {
  return (
    <Table basic="very" celled collapsing className="userTable">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Driver</Table.HeaderCell>
          <Table.HeaderCell>Status </Table.HeaderCell>
          <Table.HeaderCell>Start Location</Table.HeaderCell>
          <Table.HeaderCell>Pick-up Location</Table.HeaderCell>
          <Table.HeaderCell>Delivery Location</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.orders.map(order => (
          <Table.Row key={order.id}>
            <Table.Cell>
              <Header as="h4" image>
                <Image src={order.user.imageUrl} rounded size="mini" />
                <Header.Content>
                  {order.user.name}
                  <Header.Subheader>
                    Member since {order.user.createdAt.slice(0, 10)}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header as="h4" image>
                <Image src={order.driver.user.imageUrl} rounded size="mini" />
                <Header.Content>
                  {order.driver.user.name}
                  <Header.Subheader>
                    Driver since {order.driver.user.createdAt.slice(0, 10)}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>
              {order.startLocationLat
                ? `Lat: ${order.startLocationLat.slice(
                    0,
                    5
                  )} Lng: ${order.startLocationLng.slice(0, 5)}`
                : ''}
            </Table.Cell>
            <Table.Cell>
              {order.pickupLocationLat
                ? `Lat: ${order.pickupLocationLat.slice(
                    0,
                    5
                  )} Lng: ${order.pickupLocationLng.slice(0, 5)}`
                : ''}
            </Table.Cell>
            <Table.Cell>
              {order.deliveryLocationLat
                ? `Lat: ${order.deliveryLocationLat.slice(
                    0,
                    5
                  )} Lng: ${order.deliveryLocationLng.slice(0, 5)}`
                : ''}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default OrderTable
