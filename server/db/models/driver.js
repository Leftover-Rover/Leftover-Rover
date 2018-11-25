const Sequelize = require('sequelize')
const db = require('../db')

const Driver = db.define('driver', {
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
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
  },
  currentLocationLat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  currentLocationLng: {
    type: Sequelize.DECIMAL(10, 6)
  }
})

Driver.findNearest = async (myLat, myLng) => {
  const drivers = await Driver.findAll({
    where: {
      isAvailable: true,
      isActive: true
    }
  })
  let driverList = drivers.map(driver => {
    const latScore = Math.abs(myLat - driver.currentLocationLat)
    const lngScore = Math.abs(myLng - driver.currentLocationLng)
    const score = latScore + lngScore
    return [score, driver.id]
  })

  driverList.sort()
  console.log(driverList)
  let closest = driverList.slice(0, 5)
  const output = closest.map(val => {
    return val[1]
  })
  console.log(output)
  return output
}

module.exports = Driver
