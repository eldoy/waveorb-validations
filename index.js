const unique = require('./lib/unique.js')
const exist = require('./lib/exist.js')

module.exports = function validations($) {

  return {
    unique: {
      type: 'string|object',
      fn: unique($)
    },
    exist: {
      type: 'string',
      fn: exist($)
    }
  }
}
