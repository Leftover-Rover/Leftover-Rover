import io from 'socket.io-client'
import { driverEvent } from './components/DriverSwitch'

const socket = io(window.location.origin)

driverEvent.on('driverIsActive', () => {
  socket.on('driverRequest', order =>
    console.log('do you want this Rover?', order)
  )
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
