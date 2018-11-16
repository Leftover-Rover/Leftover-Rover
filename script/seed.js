'use strict'

const db = require('../server/db')
const { User, Driver, Address } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'driver@driver.com',
      password: '123',
      phoneNumber: '1234567892'
    }),
    User.create({
      email: 'customer@customer.com',
      password: '123',
      phoneNumber: '1234567893'
    }),
    User.create({
      email: 'cody@email.com',
      password: '123',
      phoneNumber: '1234567891'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      phoneNumber: '1234567890'
    })
  ])

  const drivers = await Promise.all([
    Driver.create({
      status: 'Searching',
      carMake: 'Toyota',
      carModel: 'Camry',
      licensePlate: 'JDANS23S',
      carColor: 'Red',
      currentLocationLat: 41.891083,
      currentLocationLng: -87.624501
    })
  ])

  const addresses = await Promise.all([
    Address.create({
      street1: '3838 N Fremont St',
      city: 'Chicago',
      state: 'IL',
      zip: 60613,
      lat: 41.952363,
      lng: -87.652167
    })
  ])

  await drivers[0].setUser(users[0])
  await addresses[0].setUser(users[1])

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
