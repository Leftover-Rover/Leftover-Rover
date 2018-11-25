import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

const UserTable = props => {
  return (
    <Table basic="very" celled collapsing className="userTable">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone Number</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Header as="h4" image>
                <Image src={user.imageUrl} rounded size="mini" />
                <Header.Content>
                  {user.name}
                  <Header.Subheader>
                    Member since {user.createdAt.slice(0, 10)}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.phoneNumber}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default UserTable
