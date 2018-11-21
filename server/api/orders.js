const { EventEmitter } = require('events')

const router = require('express').Router()
const { Order, User, Driver } = require('../db/models')
module.exports = router

const routeRequested = new EventEmitter()
router.routeRequested = routeRequested

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
      isAvailable: true,
      isActive: true
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
  return closest.driverId
}

router.put('/', async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id)
    await order.update({
      status: req.body.status,
      pickupTime: req.body.pickupTime
    })
    req.session.orderId = order.id
    res.json(order)
  } catch (error) {
    console.log(error)
  }
})

// Route for creating an order when user requests a driver
router.post('/', async (req, res, next) => {
  // req.body = {pickupLocationLat,
  // pickupLocationLng,
  // dropoffLocationLat,
  // dropoffLocationLng,
  // deliveryNotes}
  try {
    const { id } = idFinder(req)
    const driverId = await findDriver(
      req.body.pickupLocationLat,
      req.body.pickupLocationLng
    )
    const driver = await Driver.findById(driverId)
    const orderData = {
      userId: id,
      pickupLocationLat: req.body.pickupLocationLat,
      pickupLocationLng: req.body.pickupLocationLng,
      deliveryLocationLat: req.body.dropoffLocationLat,
      deliveryLocationLng: req.body.dropoffLocationLng,
      deliveryNotes: req.body.deliveryNotes
    }
    const order = await Order.create(orderData)

    // Between here is where we would wait for driver to accept
    routeRequested.emit('routeRequested', order)

    await Promise.all([
      driver.update({ isAvailable: false }),
      order.update({
        status: 'ToPickup',
        startLocationLat: driver.currentLocationLat,
        startLocationLng: driver.currentLocationLng
      }),
      order.setDriver(driver)
    ])
    req.session.orderId = order.id
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', (req, res, next) => {
  if(!req.session.orderId) {
    return next()
  } else  {
    Order.findById(req.session.orderId)
    .then(order => order ? res.json(order) : next())
    .catch(next)
  }
})
