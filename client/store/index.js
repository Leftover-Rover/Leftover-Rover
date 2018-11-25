import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import order from './order'
import myLocation from './myLocation'
import actionItem from './actionItem'
import users from './users'

const reducer = combineReducers({
  user,
  order,
  myLocation,
  actionItem,
  users
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
export * from './myLocation'
export * from './actionItem'
export * from './users'
