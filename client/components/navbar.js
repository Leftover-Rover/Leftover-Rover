import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {handleClick, isLoggedIn} = this.props
    const {activeItem} = this.state

    return (
      <div>
        <h1>Leftover Rover</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              <Menu>
                <Menu.Item
                  as={Link}
                  to="/home"
                  name="home"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                >
                  Home
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/#"
                  name="logout"
                  active={activeItem === 'logout'}
                  onClick={handleClick}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </div>
          ) : (
            <div>
              <Menu>
                <Menu.Item
                  as={Link}
                  to="/login"
                  name="login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                >
                  Login
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/signup"
                  name="signup"
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                >
                  Signup
                </Menu.Item>
              </Menu>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
