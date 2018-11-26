const router = require('express').Router()
const axios = require('axios')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API)

router.post('/', (req, res, next) => {
  try {
    const msg = {
      to: `${req.body.email}`,
      from: 'leftoverrover@gmail.com',
      subject: 'Your Leftovers Have Been Delivered!',
      text: "This Rover's Trip Is Over",
      html: '<strong>Thank You For Using Leftover Rover!!!!!!</strong>'
    }
    sgMail.send(msg)
  } catch (err) {
    next(err)
  }
})

module.exports = router
