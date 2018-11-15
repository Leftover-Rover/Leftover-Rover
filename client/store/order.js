import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'

/**
 * INITIAL STATE
 */
const order = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_ORDER, order })

/**
 * THUNK CREATORS
 */
export const postOrder = (
  startLocationLat,
  startLocationLng
) => async dispatch => {
  try {
    const res = await axios.post('/api/orders', {
      startLocationLat,
      startLocationLng
    })
    dispatch(getOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = order, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
