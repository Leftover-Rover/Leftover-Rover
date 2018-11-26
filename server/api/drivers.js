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
