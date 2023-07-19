var { validate } = require('d8a')
var db = require('configdb')

module.exports = async function () {
  return { db, validate }
}
