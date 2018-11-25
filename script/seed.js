'use strict'

const db = require('../server/db')
const { User, Driver, Order } = require('../server/db/models')
const usersFile = require('./users')
const driversFile = require('./drivers')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const user100 = await Promise.all(usersFile.map(user => User.create(user)))

  const users = await Promise.all([
    User.create({
      name: 'driver person',
      email: 'driver@driver.com',
      password: '123',
      phoneNumber: '1234567892',
      defaultDeliveryLat: 41.92943,
      defaultDeliveryLng: -87.708246
    }),
    User.create({
      name: 'classic customer',
      email: 'customer@customer.com',
      password: '123',
      phoneNumber: '1234567893',
      defaultDeliveryLat: 41.952363,
      defaultDeliveryLng: -87.652167
    }),
    User.create({
      name: 'admin cody',
      email: 'cody@email.com',
      password: '123',
      phoneNumber: '1234567891',
      defaultDeliveryLat: 41.896044,
      defaultDeliveryLng: -87.677849,
      isAdmin: true
    }),
    User.create({
      name: 'murph mcgee',
      email: 'murphy@email.com',
      password: '123',
      phoneNumber: '1234567890',
      defaultDeliveryLat: 41.952363,
      defaultDeliveryLng: -87.652167
    }),
    User.create({
      name: 'Daniel Eimer',
      email: 'daniel@email.com',
      password: '123',
      phoneNumber: '1234562890',
      defaultDeliveryLat: 41.95232,
      defaultDeliveryLng: -87.65218
    })
  ])

  const drivers = await Promise.all([
    Driver.create({
      isActive: true,
      isAvailable: true,
      carMake: 'Toyota',
      carModel: 'Camry',
      licensePlate: 'JDANS23S',
      carColor: 'Red',
      currentLocationLat: 41.891083,
      currentLocationLng: -87.624501
    }),
    Driver.create({
      isActive: true,
      isAvailable: true,
      carMake: 'Toyota',
      carModel: 'Camry',
      licensePlate: 'JDANS23S',
      carColor: 'Red',
      currentLocationLat: 41.891083,
      currentLocationLng: -87.624501
    }),
    Driver.create({
      isActive: true,
      isAvailable: true,
      carMake: 'Toyota',
      carModel: 'Camry',
      licensePlate: 'JDANS23S',
      carColor: 'Red',
      currentLocationLat: 41.95232,
      currentLocationLng: -87.65218
    })
  ])

  const driver100 = await Promise.all(
    driversFile.map(driver => Driver.create(driver))
  )

  await Promise.all([
    Order.create({
      pickupLocationLat: 41.948128,
      pickupLocationLng: -87.656361,
      status: 'Requested'
    }),
    Order.create({
      startLocationLat: 41.948128,
      startLocationLng: -87.656361,
      pickupLocationLat: 41.920361,
      pickupLocationLng: -87.63305,
      status: 'ToPickup'
    }),
    Order.create({
      startLocationLat: 41.931624,
      startLocationLng: -87.658919,
      pickupLocationLat: 41.920361,
      pickupLocationLng: -87.63305,
      pickupTime: Date.now(),
      deliveryLocationLat: 41.920361,
      deliveryLocationLng: -87.63305,
      status: 'ToDropOff'
    }),
    Order.create({
      startLocationLat: 41.931624,
      startLocationLng: -87.658919,
      pickupLocationLat: 41.920361,
      pickupLocationLng: -87.63305,
      pickupTime: Date.now(),
      deliveryLocationLat: 41.920361,
      deliveryLocationLng: -87.63305,
      deliveryTime: Date.now(),
      status: 'Completed'
    })
  ])

  await drivers[0].setUser(users[0])
  await drivers[1].setUser(users[1])
  await drivers[2].setUser(users[4])
  await Promise.all(
    driver100.map((driver, index) => driver.setUser(user100[index]))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
