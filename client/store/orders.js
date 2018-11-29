import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => ({ type: GET_ORDERS, orders })

export const fetchOrders = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
