import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Loader, Button } from 'semantic-ui-react'

export class UserProfile extends Component {
  render() {
    if (this.props.user && this.props.user.id) {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            justifyItems: 'center',
            paddingTop: '2%',
            marginTop: '2%',
            fontSize: 'large'
          }}
        >
          <Image
            centered
            circular
            size='medium'
            src={
              this.props.user.imageUrl === null || this.props.user.imageUrl === undefined || this.props.user.imageUrl === ''
                ? 'https://image.flaticon.com/icons/svg/194/194630.svg'
                : this.props.user.imageUrl
            }
          />
          <h1 style={{fontSize: '3.2rem'}} >
            {this.props.user.name === null
              ? this.props.user.email
              : this.props.user.name.toUpperCase()}
          </h1>
          <h5 style={{fontSize: '1.75rem'}} >Phone:{' '}
          {this.props.user.phoneNumber === null
            ? 'N/A'
            : `${this.props.user.phoneNumber.slice(0, 3)}-${this.props.user.phoneNumber.slice(3, 6)}-${this.props.user.phoneNumber.slice(6)}`}</h5>
            <h5 style={{fontSize: '1.75rem'}} >Email:{' '}
          {this.props.user.email}</h5>
          <div style={{
            paddingTop: '5%',
            marginTop: '5%'
          }} >
          <Button color='teal' size='massive' as='a' href='/me/profile/edit' >
            UPDATE PROFILE
          </Button>
          <div style={{
            paddingTop: '1%',
            marginTop: '1%',
            paddingBottom: '1%',
            marginBottom: '1%'
          }} />
          <Button color='teal' size='massive' as='a' href='/me/update-dropoff' >
            UPDATE ADDRESS
          </Button>
          </div>
          <div />
          <div />
        </div>
      )
    } else {
      return <Loader active inline="centered" />
    }
  }
}

const mapDispatch = dispatch => {
  return {
    tbd: () => dispatch()
  }
}

const mapState = state => {
  return {
    user: state.user,
    loggedinUser: state.loggedinUser
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
