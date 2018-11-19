import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import order from './order'
import myLocation from './myLocation'
import loggedinUser from './loggedinUser'

const reducer = combineReducers({ user, order, myLocation, loggedinUser })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
export * from './myLocation'
export * from './loggedinUser'
