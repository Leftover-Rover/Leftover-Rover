import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const SET_ORDER = 'SET_ORDER'

/**
 * INITIAL STATE
 */
const order = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_ORDER, order })
const setOrder = order => ({ type: SET_ORDER, order })

/**
 * THUNK CREATORS
 */
export const getCurrentOrder = currentOrder => dispatch => {
  dispatch(getOrder(currentOrder))
}

export const updateOrderToDropOff = id => async dispatch => {
  try {
    const { data } = await axios.put('/api/orders', {
      id,
      status: 'ToDropOff',
      pickupTime: Date.now()
    })
    dispatch(getOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderToCompleted = (id, userId) => async dispatch => {
  try {
    const deliveryTime = Date.now()
    const { data } = await axios.put('/api/orders', {
      id,
      status: 'Completed',
      deliveryTime
    })
    dispatch(getOrder(data))
  } catch (error) {
    console.error(error)
  }
  try {
    const user = await axios.get(`/api/users/${userId}`)
    await axios.post('/api/email', user.data)
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderToCancelled = id => async dispatch => {
  try {
    await axios.put('/api/orders', {
      id,
      status: 'Cancelled'
    })
    const data = {}
    dispatch(setOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderToEmpty = () => dispatch => {
  try {
    const data = {}
    dispatch(setOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const postOrder = ({
  pickupLocationLat,
  pickupLocationLng,
  dropoffLocationLat,
  dropoffLocationLng,
  deliveryNotes
}) => async dispatch => {
  try {
    const res = await axios.post('/api/orders', {
      pickupLocationLat,
      pickupLocationLng,
      dropoffLocationLat,
      dropoffLocationLng,
      deliveryNotes
    })
    dispatch(getOrder(res.data))
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserCurrentOrder = () => {
  return async (dispatch, getState) => {
    const state = getState()
    let userId = state.user.id
    const currentOrder = await axios.get(`/api/orders/${userId}`)
    dispatch(setOrder(currentOrder.data))
  }
}

export const driverAcceptOrder = (id, driverList) => async dispatch => {
  try {
    const { data } = await axios.put(`api/orders/${id}`, {
      drivers: driverList
    })
    dispatch(getOrder(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = order, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}
