import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu, Sidebar, Icon, Label } from 'semantic-ui-react'
import DriverSwitch from './DriverSwitch'

export class SidebarMenu extends Component {
  state = { visible: false }

  handleToggle = () => {
    console.log('toggling!')
    this.setState(state => ({ visible: !state.visible }))
  }

  render() {
    const { visible } = this.state
    const { handleClick, isAdmin } = this.props
    console.log(visible)

    return (
      <div
        className="renderOverMap"
        style={{
          display: 'flex',
          margin: '8px',
          padding: '8px',
          textAlign: 'center',
          justifyContent: 'center',
          justifyItems: 'center'
        }}
      >
        <Label
          as="a"
          basic
          size="large"
          onClick={() => {
            this.setState({ visible: true })
          }}
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            justifyItems: 'center'
          }}
        >
          <Icon
            name="sidebar"
            size="large"
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              margin: '1px',
              padding: '1px'
            }}
          />
        </Label>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => this.setState({ visible: false })}
          vertical
          visible={visible}
          style={{ fontSize: '1.75rem' }}
        >
          <Menu.Item href="/me">Home</Menu.Item>
          {isAdmin ? (
            <Menu.Item href="/admin">Admin Dashboard</Menu.Item>
          ) : (
            <React.Fragment />
          )}
          <Menu.Item href="/me/profile">My Profile</Menu.Item>
          <Menu.Item href="/me/order-history">My Order History</Menu.Item>
          {this.props.driver ? (
            <Menu.Item
              onClick={() => {
                console.log('hiding!')
                this.setState({ visible: false })
              }}
            >
              <DriverSwitch />
            </Menu.Item>
          ) : (
            <Menu.Item href="/signup-to-drive">Become A Rover</Menu.Item>
          )}
          <Menu.Item
            as={Link}
            to="/#"
            name="logout"
            onClick={handleClick}
            position="right"
          >
            Logout
          </Menu.Item>
        </Sidebar>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    driver: state.user.driver,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(SidebarMenu)
