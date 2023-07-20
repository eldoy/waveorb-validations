var validations = require('../../index.js')

var $, opt

setup(async function ({ db }) {
  db('user').clear()
  $ = {
    db,
    t: function (key) {
      return key
    },
    params: { query: {}, values: {} }
  }
  opt = { ext: validations($), lax: true, $ }
})

// Test exist
it('should fail if not exist', async function ({ t, db, validate }) {
  var spec = {
    id: {
      exist: 'project'
    }
  }

  var data = {
    id: '1234'
  }

  var result = await validate(spec, data, opt)
  t.equals(result.id[0], 'validation.exist')

  var project = db('project').create({ name: 'hello' })

  data.id = project.id

  result = await validate(spec, data, opt)
  t.equals(result, null)
})
