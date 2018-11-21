const colors = ['red', 'black', 'blue', 'white']

const cars = [
  ['Toyota', 'Corrola', 'Camry', 'RAV4', 'Prius'],
  ['Nissan', 'Juke', 'Sentra', 'Murano', 'Versa'],
  ['Volkswagen', 'Golf', 'Tiguan', 'Jetta', 'Passat'],
  ['Honda', 'Civic', 'CR-V', 'Accord', 'Pilot']
]

const minLat = 41.7
const maxLat = 42.04
const minLng = -87.8
const maxLng = -87.61

const randomLocation = () => {
  const random = Math.random()
  return [
    minLat + (maxLat - minLat) * random,
    minLng + (maxLng - minLng) * random
  ]
}

const randomLicense = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

const random = () => Math.floor(Math.random() * 4)

const drivers = Array(100).fill({})

module.exports = drivers.map((driver, index) => {
  const location = randomLocation()
  const carArray = cars[random()]
  return {
    isAvailable: true,
    isActive: true,
    carMake: carArray[0],
    carModel: carArray[random() + 1],
    licensePlate: randomLicense(),
    carColor: colors[random()],
    currentLocationLat: location[0],
    currentLocationLng: location[1]
  }
})
