import io from 'socket.io-client'
import { driverEvent } from './components/DriverSwitch'
import store, { updateActionItem } from './store'

const socket = io(window.location.origin)

driverEvent.on('driverIsActive', () => {
  socket.on('driverRequest', (order, driverList) => {
    console.log('update action item:', updateActionItem, 'store: ', store)
    store.dispatch(updateActionItem())
    console.log('do you want this Rover?', order, driverList)
  })
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
