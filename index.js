var unique = require('./lib/unique.js')
var exist = require('./lib/exist.js')
var owner = require('./lib/owner.js')

module.exports = function validations($) {
  return {
    unique: {
      type: 'string|object',
      fn: unique($)
    },
    exist: {
      type: 'string',
      fn: exist($)
    },
    owner: {
      type: 'string',
      fn: owner($)
    }
  }
}
