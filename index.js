var unique = require('./lib/unique.js')
var exist = require('./lib/exist.js')
var owner = require('./lib/owner.js')

module.exports = function validations($) {
  return {
    unique: {
      fn: unique($)
    },
    exist: {
      fn: exist($)
    },
    owner: {
      fn: owner($)
    }
  }
}
