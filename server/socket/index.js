const router = require('../api/orders')

const routeRequested = router.routeRequested

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('driver')
    routeRequested.on('routeRequested', (order, driverList) => {
      socket.emit('driverRequest', order, driverList)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
