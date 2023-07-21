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

    const query = { [field]: got }

    let v = $.params.values || {}
    const q = $.params.query || {}
    const id = q[want.id]

    // If we have id, then it's an update
    if (id) {
      query[want.id] = { $ne: id }

      // Check in object if it exists
      v = await $.db(want.in).get({ [want.id]: id })
    }

    for (const field of want.with) {
      const val = v && v[field]
      if (val) query[field] = val
    }

    const count = await $.db(want.in).count(query)
    if (count) {
      add(field, $.t('validation.unique'))
    }
  }
}
