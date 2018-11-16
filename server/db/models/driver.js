const Sequelize = require('sequelize')
const db = require('../db')

const Driver = db.define('driver', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
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
  },
  currentLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  currentLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  }
})

module.exports = Driver
