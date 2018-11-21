import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Segment, Grid, Button, Input, Form } from 'semantic-ui-react'
import axios from 'axios'
import { TOKEN } from './constant'
import { addDefaultAddress } from '../store/user'


export class AddDefaultAddress extends Component {
  constructor() {
    super()
    this.state = {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: 0,
      lat: 0.0,
      lng: 0.0
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const newAddress = {
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }

    const addressForSearch = `${newAddress.street1}+${newAddress.city}+${
      newAddress.state
    }+${newAddress.zip}`

    const encodedAddress = addressForSearch.replace(' ', '+')

    const coordsData = await axios({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${TOKEN}&country=US`
    })
      .then(results => {
        if (results.status === 200) {
          newAddress.lat = results.data.features[0].center[1]
          newAddress.lng = results.data.features[0].center[0]
        } else {
          this.props.history.replace('/me/default-dropoff')
          alert(
            "Sorry, we couldn't find that location. Please check for typoes, spelling, or any other errors and try again."
          )
        }
      })
      .catch(err => console.error(err))

    await this.props.addDefaultDropoff(this.props.user, newAddress)

    // ** NOTE **
    // Not sure how we want to handle confirmation on the front-end, we can push/redirect the user to a new page or use a pop-up confirmation window
  }

  componentDidUpdate = prevProps => {
    if (this.props.user) {
      if (
        this.props.user.defaultDeliveryLat !==
          prevProps.user.defaultDeliveryLat ||
        this.props.user.defaultDeliveryLng !== prevProps.user.defaultDeliveryLng
      ) {
        this.props.history.push('/me')
      }
    }
  }

  render() {

    return (
      <Grid centered>
        <Grid.Column>
          <Segment>
            <h3
              style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
                flexDirection: 'column',
                padding: '4px',
                margin: '4px',
                textAlign: 'center'
              }}
            >
              Add Your Default Dropoff Address
            </h3>
            <Form
              style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
                flexDirection: 'column',
                padding: '4px',
                margin: '4px'
              }}
            >
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Street</label>
                  <input
                    name="street1"
                    required
                    type="text"
                    value={this.state.street1}
                    onChange={e => this.setState({ street1: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Apt/Unit/Etc</label>
                  <input
                    name="street2"
                    type="text"
                    value={this.state.street2}
                    onChange={e => this.setState({ street2: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>City</label>
                  <input
                    name="city"
                    required
                    type="text"
                    value={this.state.city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>State</label>
                  <select
                    name="state"
                    required
                    value={this.state.state}
                    onChange={e => this.setState({ state: e.target.value })}
                  >
                    {[
                      'AL',
                      'AK',
                      'AS',
                      'AZ',
                      'AR',
                      'CA',
                      'CO',
                      'CT',
                      'DE',
                      'DC',
                      'FM',
                      'FL',
                      'GA',
                      'GU',
                      'HI',
                      'ID',
                      'IL',
                      'IN',
                      'IA',
                      'KS',
                      'KY',
                      'LA',
                      'ME',
                      'MH',
                      'MD',
                      'MA',
                      'MI',
                      'MN',
                      'MS',
                      'MO',
                      'MT',
                      'NE',
                      'NV',
                      'NH',
                      'NJ',
                      'NM',
                      'NY',
                      'NC',
                      'ND',
                      'MP',
                      'OH',
                      'OK',
                      'OR',
                      'PW',
                      'PA',
                      'PR',
                      'RI',
                      'SC',
                      'SD',
                      'TN',
                      'TX',
                      'UT',
                      'VT',
                      'VI',
                      'VA',
                      'WA',
                      'WV',
                      'WI',
                      'WY'
                    ].map(st => {
                      return (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      )
                    })}
                  </select>
                  <Form.Field>
                    <label>Zip Code</label>
                    <input
                      name="zip"
                      required
                      type="number"
                      minLength="5"
                      maxLength="5"
                      value={this.state.zip}
                      onChange={e => this.setState({ zip: e.target.value })}
                    />
                  </Form.Field>
                </Form.Field>
              </Form.Group>
            </Form>
<<<<<<< HEAD
            <div />
          <div style={{
            paddingTop: '5%',
            marginTop: '5%'
          }} >
          <Button color='teal' size='massive' type='submit' onClick={this.handleSubmit} >
            UPDATE ADDRESS
          </Button>
          </div>
            {/* <button type="submit" onClick={this.handleSubmit} >PRESS FOR API CALL</button> */}
=======
            <button type="submit" onClick={this.handleSubmit}>
              PRESS FOR API CALL
            </button>
>>>>>>> 46f874f8abb082f10e56e1fc78d46a940b5c86d9
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addDefaultDropoff: (user, location) =>
      dispatch(addDefaultAddress(user, location))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(AddDefaultAddress)
