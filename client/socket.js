import io from 'socket.io-client'
import { driverEvent } from './components/DriverSwitch'

const socket = io(window.location.origin)

driverEvent.on('driverIsActive', driver => {
  socket.on('driverRequest', order =>
    console.log('do you want this Rover?', order)
  )
  socket.emit('driverStatus', driver)
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
