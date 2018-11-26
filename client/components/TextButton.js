import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export const TextButton = props => {

  const handleClick = async e => {
    e.preventDefault();
    const number = props.user.phoneNumber;
    await axios.get(`/api/texts/${number}/${e.target.name}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '10%',
        margin: '5%',
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <div>
        <button type="button" style={{ width: '150px' }} name="order-accepted" onClick={e => handleClick(e)} >
          SEND ORDER ACCEPTED TEXT
        </button>
      </div>
      <div>
        <button type="button" style={{ width: '150px' }} name="pickup" onClick={e => handleClick(e)} >
          SEND MEET DRIVER TEXT
        </button>
      </div>
      <div>
        <button type="button" style={{ width: '150px' }} name="dropoff" onClick={e => handleClick(e)} >
          SEND DROPOFF SUCCESS TEXT
        </button>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    tbd: () => dispatch()
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(TextButton)

// export default TextButton
