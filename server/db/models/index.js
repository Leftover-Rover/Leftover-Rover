const User = require('./user')
const Driver = require('./driver')
const Order = require('./order')
const Address = require('./address')

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Driver)
Driver.belongsTo(User)

Driver.hasMany(Order)
Order.belongsTo(Driver)

module.exports = {
  User,
  Driver,
  Order,
  Address
}
