var { validate } = require('d8a')
var db = require('configdb')

global.fn = async function (promise) {
  try {
    var result = await promise
    return [result, null]
  } catch (e) {
    return [null, e]
  }
}

module.exports = async function () {
  return { db, validate }
}
