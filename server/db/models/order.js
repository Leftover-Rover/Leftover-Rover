const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  startLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  startLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  },
  pickupLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  pickupLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  },
  pickupTime: {
    type: Sequelize.DATE
  },
  deliveryLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  deliveryLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  },
  deliveryTime: {
    type: Sequelize.DATE
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 500
  },
  deliveryNotes: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM,
    values: ['Requested', 'ToPickup', 'ToDropOff', 'Completed', 'Cancelled'],
    defaultValue: 'Requested'
  }
})

module.exports = Order
