import React from 'react'
import { Image, Item, Segment, Grid, List } from 'semantic-ui-react'

const DriverUserItem = props => {
  const phoneNumber = `${props.user.phoneNumber.slice(
    0,
    3
  )}-${props.user.phoneNumber.slice(3, 6)}-${props.user.phoneNumber.slice(6)}`

  return (
    <Segment
      style={{
        width: '90%',
        margin: '2vw'
      }}
    >
      <Grid columns={2}>
        <Grid.Column>
          {props.user.imageUrl ? (
            <Image size="tiny" src={props.user.imageUrl} />
          ) : (
            <Image
              size="tiny"
              src="https://image.flaticon.com/icons/svg/194/194630.svg"
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as="a">{props.user.name}</Item.Header>
                <Item.Description>
                    <List>
                      {props.driver &&
                      props.driver.user.phoneNumber === null ? (
                        <div />
                      ) : (
                        <List.Item>
                          <a href={`tel:${props.user.phoneNumber}`}>{phoneNumber}</a>
                        </List.Item>
                      )}
                    </List>
                  </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default DriverUserItem
