import React from 'react'
import { Image, Item, Segment, Grid } from 'semantic-ui-react'

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
              {/* {props.user.imageUrl ? (
            <Item.Image size="mini" src={props.user.imageUrl} />
          ) : (
            <Item.Image
              size="mini"
              src="https://image.flaticon.com/icons/svg/194/194630.svg"
            />
          )} */}

              <Item.Content>
                <Item.Header as="a">{props.user.name}</Item.Header>
                <Item.Meta>{phoneNumber}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default DriverUserItem
