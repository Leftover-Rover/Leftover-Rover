import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getUsers = users => ({
  type: GET_ALL_USERS,
  users
})

export const fetchAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
