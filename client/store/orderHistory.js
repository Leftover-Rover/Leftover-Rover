import axios from 'axios'

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

const setOrders = orders => ({
  type: GET_ORDER_HISTORY,
  orders
})

export const fetchAllOrders = user => async dispatch => {
  try {
    const orders = await axios.get(`/api/users/${user.id}/orders`)
    dispatch(setOrders(orders.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orders
    default:
      return state
  }
}
