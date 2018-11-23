import io from 'socket.io-client'
import { driverEvent } from './components/DriverSwitch'
import store, { updateActionItem } from './store'

const socket = io(window.location.origin)

driverEvent.on('driverIsActive', () => {
  socket.on('driverRequest', (order, driverList) => {
    // Checking here to see if I am one of the drivers in the driverList sent from the server. If I am, then I will get the updated action item.
    console.log(driverList)
    driverList.forEach(driver => {
      if (driver.id === store.getState().user.driver.id) {
        store.dispatch(updateActionItem())
        console.log('do you want this Rover?', order, driverList)
      }
    })
  })
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
