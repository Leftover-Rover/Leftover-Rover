const router = require('express').Router()
const { User, Address } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/address', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId)
    if (!user) {
      const err = new Error('User Not Found Or No User Is Logged In')
      err.status = 500
      return next(err)
    } else {
      const updatedUser = await user.update({
        ...user,
        defaultDeliveryLat: req.body.newDefaultLat,
        defaultDeliveryLng: req.body.newDefaultLng
      })
      res.json(updatedUser)
    }
  } catch (err) {
    console.error(err)
  }
})
