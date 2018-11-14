const Sequelize = require('sequelize')
const db = require('../db')

const Driver = db.define('driver', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  carMake: {
    type: Sequelize.STRING
  },
  carModel: {
    type: Sequelize.STRING
  },
  carColor: {
    type: Sequelize.STRING
  },
  licensePlate: {
    type: Sequelize.STRING
  },
  averageRating: {
    type: Sequelize.DECIMAL(10, 1)
  }
})

module.exports = Driver
