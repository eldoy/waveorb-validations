module.exports = function ($) {
  if (!$.db) return function () {}

  // Check if logged in user owns the document
  return async function ({ want, got, field, add }) {
    console.log({ want, got, field, add })
    var [model, id] = field.split('_')

    if (!id) {
      throw new Error('id not found')
    }

    var user = $.data[want] || $.cache[want]

    if (!user) {
      throw new Error('user not found')
    }

    // var user = await db('user').get({ token })

    // var project = await db('project').get({ id: project_id })
    // if (project && project.user_id == user.id) {
    //   ok
    // } else {
    //   fail
    // }

    // console.log({ model, id })

    // if (!valid) {
    //   add(field, $.t('validation.exist'))
    // }

    // if (field == `${want}_id`) field = 'id'
    // const query = { [field]: got }
    // const count = await $.db(want).count(query)
    // if (!count) {
    //   add(field, $.t('validation.exist'))
    // }
  }
}
