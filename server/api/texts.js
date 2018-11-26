const router = require('express').Router()
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

router.get('/:userPhone/order-accepted', async (req, res, next) => {
  try {
    const user = `+1${String(req.params.userPhone)}`
    const text = 'A Rover is on the way!'
    await client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user,
        body: text
      })
      .then(message => {
        console.log('SMS API Response:', message)
        res.json(message)
      })
      .done()
  } catch (err) {
    console.error(err)
  }
})

router.get('/:userPhone/pickup', async (req, res, next) => {
  try {
    const user = `+1${String(req.params.userPhone)}`
    const text = 'Your Rover will arrive soon to pickup your food.'
    await client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user,
        body: text
      })
      .then(message => {
        console.log('SMS API Response:', message)
        res.json(message)
      })
      .done()
  } catch (err) {
    console.error(err)
  }
})

router.get('/:userPhone/dropoff', async (req, res, next) => {
  try {
    const user = `+1${String(req.params.userPhone)}`
    const text = 'Your Rover completed the delivery of your leftovers!'
    await client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user,
        body: text
      })
      .then(message => {
        console.log('SMS API Response:', message)
        res.json(message)
      })
      .done()
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
