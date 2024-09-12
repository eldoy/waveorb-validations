module.exports = function ($) {
  if (!$.db) return function () {}

  // Check if document field is unique in db collection
  return async function ({ want, got, field, add }) {
    if (typeof want == 'string') {
      want = { in: want }
    }
    if (!want.in) {
      throw new Error("unique 'in' field not found")
    }
    if (!want.with) want.with = []
    if (!want.id) want.id = 'id'

    var query = { [field]: got }

    var v = $.params.values || {}
    var q = $.params.query || {}
    var id = q[want.id]

    // If we have id, then it's an update
    if (id) {
      query[want.id] = { $ne: id }

      // Check in object if it exists
      v = await $.db(want.in).get({ [want.id]: id })
    }

    for (var name of want.with) {
      var val = v && v[name]
      if (val) query[name] = val
    }

    var count = await $.db(want.in).count(query)
    if (count) {
      add(field, $.t('validation.unique'))
    }
  }
}
