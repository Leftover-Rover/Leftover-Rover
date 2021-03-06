import io from 'socket.io-client'
import { driverEvent } from './components/DriverSwitch'
import { userEvent } from './components/MapRoute'
import store, { updateActionItem, getCurrentOrder } from './store'

const socket = io(window.location.origin)

export const orderInfo = { orderForDriver: {}, driverList: [] }

driverEvent.on('driverIsActive', () => {
  console.log('ready for orders')
  socket.on('driverRequest', (orderForDriver, driverList) => {
    // Checking here to see if I am one of the drivers in the driverList sent from the server. If I am, then I will get the updated action item.
    console.log('order offered to', driverList)
    // store.dispatch(updateActionItem())
    driverList.forEach(driver => {
      if (driver.id === store.getState().user.driver.id) {
        store.dispatch(updateActionItem())
        orderInfo.orderForDriver = orderForDriver
        orderInfo.driverList = driverList
        console.log('do you want this Rover?', orderInfo)
      }
    })
  })
})

userEvent.on('orderRequested', () => {
  socket.on('driverAccept', order => {
    if (order.userId === store.getState().user.id) {
      store.dispatch(getCurrentOrder(order))
    }
  })
  socket.on('orderChange', order => {
    if (order.userId === store.getState().user.id) {
      store.dispatch(getCurrentOrder(order))
    }
  })
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
