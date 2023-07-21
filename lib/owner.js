module.exports = function ($) {
  if (!$.db) return function () {}

  // Check if logged in user owns the document
  return async function ({ want, got, field, add }) {
    var [model, id] = field.split('_')
    if (!id) {
      throw new Error('id not found')
    }
    var target = $.data[want] || $.cache[want]
    if (!target) {
      throw new Error(`${want} not found`)
    }
    var count = await $.db(model).count({ id: got })
    if (!count) {
      return add(field, $.t('validation.owner'))
    }
  }
}
