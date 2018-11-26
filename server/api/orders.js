const { EventEmitter } = require('events')

const router = require('express').Router()
const { Order, User, Driver } = require('../db/models')
module.exports = router

const { isUser, isAdmin } = require('./middleware')

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

// This is the route called when a driver accepts a request. It requires the orderId as the orderId req.params. It does not need to specify the accepted driver, as the reqest will come from that driver. It does require an array of complete driver objects to be passed in as the req.body. Whether the accepting driver is included in this array does not matter.
router.put('/:orderId', isUser, async (req, res, next) => {
  // Expects req.body={drivers: [driver1, driver2, driver3, driver4]}
  try {
    const order = await Order.findById(req.params.orderId)

    await Promise.all([
      order.update({
        status: 'ToPickup',
        startLocationLat: req.user.driver.currentLocationLat,
        startLocationLng: req.user.driver.currentLocationLng
      }),
      order.setDriver(req.user.driver)
    ])
    routeRequested.emit('roverAccepted', order)
    const otherDrivers = req.body.drivers.filter(driver => {
      return driver.id !== req.user.driver.id
    })

    const otherDriverModels = []
    for (const driver of otherDrivers) {
      let temp = await Driver.findById(driver.id)
      otherDriverModels.push(temp)
    }

    for (const driver of otherDriverModels) {
      await driver.update({ isAvailable: true })
    }

    res.json(order)
  } catch (error) {
    console.log(error)
  }
})

router.put('/', isUser, async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id)
    await order.update({
      status: req.body.status,
      pickupTime: req.body.pickupTime,
      deliveryTime: req.body.deliveryTime
    })

    routeRequested.emit('orderStatusChange', order)

    req.session.orderId = order.id
    res.json(order)
  } catch (error) {
    console.log(error)
  }
})

// Route for creating an order when user requests a driver
router.post('/', isUser, async (req, res, next) => {
  // req.body = {pickupLocationLat,
  // pickupLocationLng,
  // dropoffLocationLat,
  // dropoffLocationLng,
  // deliveryNotes}

  try {
    const { id } = idFinder(req)
    const drivers = await Driver.findNearest(
      req.body.pickupLocationLat,
      req.body.pickupLocationLng
    )
    const driverList = []
    drivers.forEach(async driver => {
      driverList.push(await Driver.findById(driver))
    })

    if (drivers.length === 0) {
      res.json({})
    } else {
      const orderData = {
        userId: id,
        pickupLocationLat: req.body.pickupLocationLat,
        pickupLocationLng: req.body.pickupLocationLng,
        deliveryLocationLat: req.body.dropoffLocationLat,
        deliveryLocationLng: req.body.dropoffLocationLng,
        deliveryNotes: req.body.deliveryNotes
      }
      const order = await Order.create(orderData)

      driverList.forEach(driver => {
        driver.update({ isAvailable: false })
      })

      routeRequested.emit('routeRequested', order, driverList)

      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', (req, res, next) => {
  if (!req.session.userId) {
    console.log('here')
    return next()
  } else {
    Order.findOne({
      where: {
        userId: req.session.userId,
        status: 'Requested' || 'ToPickup' || 'ToDropOff'
      }
    })
      .then(order => (order ? res.json(order) : res.json({})))
      .catch(next)
  }
})
