const router = require('express').Router()
const { Driver, User } = require('../db/models')
const { isUser } = require('./middleware')
module.exports = router

router.put('/:driverId', isUser, async (req, res, next) => {
  try {
    let driver = await Driver.findById(req.params.driverId)
    driver = await driver.update(req.body)
    const user = await User.findById(driver.userId, {
      include: [{ model: Driver, where: { userId: driver.userId } }]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:driverId', isUser, async (req, res, next) => {
  try {
    const { currentLocationLng, currentLocationLat } = await Driver.findById(
      req.params.driverId,
      {
        attributes: ['currentLocationLat', 'currentLocationLng']
      }
    )
    res.json([currentLocationLng, currentLocationLat])
  } catch (err) {
    next(err)
  }
})
