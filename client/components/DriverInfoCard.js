import React from 'react'
import { Image, Segment, Item, Grid, List } from 'semantic-ui-react'

export const DriverInfoCard = props => {
  console.log('PROPS IN DRIVER INFO CARD:', props)

  const driverDisplayPhoneNumber = `${props.driver.user.phoneNumber.slice(
    0,
    3
  )}-${props.driver.user.phoneNumber.slice(
    3,
    6
  )}-${props.driver.user.phoneNumber.slice(6)}`

  const driverLinkPhoneNumber = `1${props.driver.user.phoneNumber}`

  const driverVehicleInfo = `${props.driver.carColor}
  ${props.driver.carMake} ${props.driver.carModel}`

  const driverLicensePlate = `${props.driver.licensePlate}`

  return (
    <Segment
      style={{
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image
              style={{
                width: '90%'
              }}
              circular
              src={
                props.driver && props.driver.user.imageUrl !== null
                  ? `${props.driver.imageUrl}`
                  : 'https://image.flaticon.com/icons/svg/194/194630.svg'
              }
            />
          </Grid.Column>

          <Grid.Column>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>
                    {props.driver.user.name
                      .slice(0, props.driver.user.name.indexOf(' '))
                      .toUpperCase()}
                  </Item.Header>
                  <Item.Description>
                    <List>
                      {props.driver &&
                      props.driver.user.phoneNumber === null ? (
                        <div />
                      ) : (
                        <List.Item>
                          <a href={`tel:${driverLinkPhoneNumber}`}>
                            {driverDisplayPhoneNumber}
                          </a>
                        </List.Item>
                      )}
                      <List.Item>Vehicle: {driverVehicleInfo}</List.Item>
                      <List.Item>License Plate: {driverLicensePlate}</List.Item>
                    </List>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default DriverInfoCard
