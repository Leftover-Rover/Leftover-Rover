const router = require('express').Router()
const { Order, User, Driver } = require('../db/models')
module.exports = router

const idFinder = req => {
  let id
  if (req.user) {
    id = req.user.dataValues.id
  } else {
    id = 2
  }
  return { id }
}

const findDriver = async (myLat, myLng) => {
  const drivers = await Driver.findAll({
    where: {
      status: 'Searching'
    }
  })
  let closest = { driverId: 2, driverScore: Infinity }
  drivers.forEach(driver => {
    const latScore = Math.abs(myLat - driver.currentLocationLat)
    const lngScore = Math.abs(myLng - driver.currentLocationLng)
    const score = latScore + lngScore
    if (score < closest.driverScore) {
      closest.driverId = driver.id
    }
  })
  // send request to driver and wait for their response
  return closest.driverId
}

// Route for creating an order when user requests a driver
router.post('/', async (req, res, next) => {
  // req.body = {startLocationLat, startLocationLng, dropOffLocationLat, dropOffLocationLng, deliveryNotes}
  try {
    const { id } = idFinder(req)
    const driverId = await findDriver(
      req.body.startLocationLat,
      req.body.startLocationLng
    )
    const driver = await Driver.findById(driverId)
    const orderData = {
      userId: id,
      startLocationLat: driver.currentLocationLat,
      startLocationLng: driver.currentLocationLng,
      driverId
    }
    const order = await Order.create(orderData)
    await driver.update({ status: 'Busy' })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
