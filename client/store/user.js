import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_DEFAULT_ADDRESS = 'UPDATE_DEFAULT_ADDRESS'
const UPDATED_USER_PROFILE = 'UPDATED_USER_PROFILE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateDefaultAddress = user => ({ type: UPDATE_DEFAULT_ADDRESS, user })
const updatedUserProfile = user => ({ type: UPDATED_USER_PROFILE, user })

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    if (method === 'signup') {
      dispatch(getUser(res.data))
      history.push('/me/default-dropoff')
    } else {
      dispatch(getUser(res.data))
      history.push('/me')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addDefaultAddress = (user, address) => async dispatch => {
  user.newDefaultLat = address.lat
  user.newDefaultLng = address.lng
  try {
    const updatedUser = await axios.put(`/api/users/${user.id}/address`, user)
    dispatch(updateDefaultAddress(updatedUser.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateExistingUser = user => async dispatch => {
  const userId = user.id
  try {
    const updatedUser = await axios.put(`/api/users/${userId}`, user)
    dispatch(updatedUserProfile(updatedUser.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateDriver = (driverId, driver) => async dispatch => {
  try {
    const res = await axios.put(`/api/drivers/${driverId}`, driver)
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_DEFAULT_ADDRESS:
      return action.user
    case UPDATED_USER_PROFILE:
      return action.user
    default:
      return state
  }
}
