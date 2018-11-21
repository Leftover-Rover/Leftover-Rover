import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_ACTION_ITEM = 'UPDATE_ACTION_ITEM'

/**
 * INITIAL STATE
 */
const actionItem = false

/**
 * ACTION CREATORS
 */
export const updateActionItem = () => ({ type: UPDATE_ACTION_ITEM })

/**
 * REDUCER
 */
export default function(state = actionItem, action) {
  switch (action.type) {
    case UPDATE_ACTION_ITEM:
      return !state
    default:
      return state
  }
}
