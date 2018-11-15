const router = require('express').Router()
const { Order, User } = require('../db/models')
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

router.post('/', async (req, res, next) => {
  // req.body = {startLocationLat, startLocationLng, dropOffLocationLat, dropOffLocationLng, deliveryNotes}
  try {
    const { id } = idFinder(req)
    const orderData = {
      userId: id,
      startLocationLat: req.body.startLocationLat,
      startLocationLng: req.body.startLocationLng
    }
    const order = await Order.create(orderData)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
