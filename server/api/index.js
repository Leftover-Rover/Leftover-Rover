const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/drivers', require('./drivers'))
<<<<<<< HEAD
router.use('/texts', require('./texts'))
=======
router.use('/email', require('./email'))
// router.use('/addresses', require('./addresses'))
>>>>>>> 42bac1d9610b00088dff5017e9c2aa24de94b57d

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
