import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER'

/**
 * INITIAL STATE
 */
const loggedinUser = {}

/**
 * ACTION CREATORS
 */
const getLoggedinUser = user => ({ type: GET_LOGGEDIN_USER, user })

/**
 * THUNK CREATORS
 */
export const fetchLoggedinUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}`)
    dispatch(getLoggedinUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateDriver = (driverId, driver) => async dispatch => {
  try {
    const res = await axios.put(`/api/drivers/${driverId}`, driver)
    dispatch(getLoggedinUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = loggedinUser, action) {
  switch (action.type) {
    case GET_LOGGEDIN_USER:
      return action.user
    default:
      return state
  }
}
