module.exports = function($) {

  if (!$.db) return function(){}

  // Check if document exists in db collection
  return async function({ want, got, field, add }) {
    if (field == `${want}_id`) field = 'id'
    const query = { [field]: got }
    const count = await $.db(want).count(query)
    if (!count) {
      add(field, $.t('validation.exist'))
    }
  }
}
