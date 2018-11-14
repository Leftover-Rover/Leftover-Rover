const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  startLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  startLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  },
  pickupTime: {
    type: Sequelize.DATE
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
    values: ['Requested', 'Accepted', 'In Progress', 'Completed']
  }
})

module.exports = Order