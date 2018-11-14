const Sequelize = require('sequelize')
const db = require('../db')

const Driver = db.define('driver', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  carMake: {
    type: Sequelize.STRING,
    allowNull: false
  },
  carModel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  carColor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  licensePlate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  averageRating: {
    type: Sequelize.DECIMAL(10, 1),
    validate: {
      min: 1,
      max: 5
    },
    defaultValue: 5
  }
})

module.exports = Driver
