const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/drivers', require('./drivers'))
router.use('/texts', require('./texts'))
router.use('/email', require('./email'))
// router.use('/addresses', require('./addresses'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
