const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  name: {
    type: Sequelize.STRING
  },
  street1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.ENUM,
    values: [
      'AL',
      'AK',
      'AS',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FM',
      'FL',
      'GA',
      'GU',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MH',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'MP',
      'OH',
      'OK',
      'OR',
      'PW',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VI',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY'
    ]
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: 5
    }
  },
  lat: {
    type: Sequelize.DECIMAL(10, 6)
  },
  lng: {
    type: Sequelize.DECIMAL(10, 6)
  }
})

module.exports = Address
