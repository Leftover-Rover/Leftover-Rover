import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Segment, Grid, Form, Loader, Button } from 'semantic-ui-react'
import { updateExistingUser } from '../store/user'
import { me } from '../store'

const nullOrUndefinedCheck = userInputData => {
  if(userInputData === null || userInputData === undefined) {
    return ''
  } else  {
    return userInputData
  }
}

export class UpdateUserProfile extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      imageUrl: ''
    }
  }

  handleUpdate = async e => {
    e.preventDefault()
    const updatedUser = {
      ...this.props.user,
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      imageUrl: this.state.imageUrl
    }
    await this.props.updateUser(updatedUser)
  }

  async componentDidMount() {
    if(!this.props.user.id) {
      await this.props.loadUser()
    }
    this.setState({
      ...this.props.user,
      name: nullOrUndefinedCheck(this.props.user.name),
      email: this.props.user.email,
      phoneNumber: nullOrUndefinedCheck(this.props.user.phoneNumber),
      imageUrl: nullOrUndefinedCheck(this.props.user.imageUrl)
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.name !== prevProps.user.name || this.props.user.email !== prevProps.user.email || this.props.user.phoneNumber !== prevProps.user.phoneNumber || this.props.user.imageUrl !== prevProps.user.imageUrl)  {
      this.props.history.push('/me/profile')
    }
  }

  render() {

    if (this.props.user && this.props.user.id !== undefined) {
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
                Update Your Profile
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
                    <label>Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      value={this.state.name === null || this.state.name === undefined ? '' : this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email Address</label>
                    <input
                      name="email"
                      required
                      type="email"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Phone Number</label>
                    <input
                      name="phoneNumber"
                      required
                      type="text"
                      value={this.state.phoneNumber}
                      onChange={e =>
                        this.setState({ phoneNumber: e.target.value })
                      }
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Profile Image</label>
                    <input
                      name="imageUrl"
                      required
                      type="text"
                      value={this.state.imageUrl === null || this.state.imageUrl === undefined ? '' : this.state.imageUrl}
                      onChange={e =>
                        this.setState({ imageUrl: e.target.value })
                      }
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              <Button
                type="submit"
                color="green"
                size="large"
                onClick={this.handleUpdate}
              >
                {' '}
                SAVE{' '}
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      )
    } else {
      return <Loader active inline="centered" />
    }
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: user => dispatch(updateExistingUser(user)),
    loadUser: () => dispatch(me())
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(UpdateUserProfile)
