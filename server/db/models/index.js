const User = require('./user')
const Address = require('./address')
const Driver = require('./driver')
const Order = require('./order')

User.hasOne(Address)
Address.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Address.hasOne(Order, { as: 'pickupLocation' })
Address.hasOne(Order, { as: 'dropoffLocation' })
Order.belongsTo(Address, { as: 'pickupLocation' })
Order.belongsTo(Address, { as: 'dropoffLocation' })

User.hasOne(Driver)
Driver.belongsTo(User)

Driver.hasMany(Order)
Order.belongsTo(Driver)

module.exports = {
  User,
  Address,
  Driver,
  Order
}
