// import axios from 'axios'
// import history from '../history'

// /**
//  * ACTION TYPES
//  */
// const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

// /**
//  * INITIAL STATE
//  */

// /**
//  * ACTION CREATORS
//  */
// const addUserAddress = address => ({ type: ADD_ADDRESS, address })

// /**
//  * THUNK CREATORS
//  */
// export const addDefaultAddress = (address) => async dispatch => {
//   try {
//     const addedAddress = await axios.post('/api/addresses/add', address)
//     console.log('addedAddress', addedAddress)
//     dispatch(addUserAddress(addedAddress))
//   } catch (err) {
//     console.error(err)
//   }
// }

// /**
//  * REDUCER
//  */
// export default function(state = {}, action) {
//   switch (action.type) {
//     case ADD_ADDRESS:
//       return action.address
//     default:
//       return state
//   }
// }
