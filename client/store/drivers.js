import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DRIVERS = 'GET_DRIVERS'

/**
 * INITIAL STATE
 */
const drivers = []

/**
 * ACTION CREATORS
 */
const getDrivers = drivers => ({ type: GET_DRIVERS, drivers })

/**
 * THUNK CREATORS
 */
export const fetchDrivers = () => async dispatch => {
  try {
    const res = await axios.get(`/api/drivers`)
    dispatch(getDrivers(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = drivers, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return action.user
    default:
      return state
  }
}
