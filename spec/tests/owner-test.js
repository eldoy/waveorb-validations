var validations = require('../../index.js')

var $, opt

setup(async function ({ db }) {
  db('user').clear()
  $ = {
    db,
    t: function (key) {
      return key
    },
    params: { query: {}, values: {} },
    data: {},
    cache: {}
  }
  opt = { ext: validations($), lax: true, $ }
})

// Test owner if no user and no project
it('should fail if no user and no project', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    project_id: {
      owner: 'user'
    }
  }

  var data = {
    project_id: '1234'
  }

  var [result, err] = await fn(validate(spec, data, opt))
  t.equal(result, null)
  t.equal(err.message, 'user not found')
})

// Test owner if no user with project
it('should fail if no user with project', async function ({ t, db, validate }) {
  var spec = {
    project_id: {
      owner: 'user'
    }
  }

  var data = {}

  var project = db('project').create({ name: 'hello' })
  data.project_id = project.id

  var [result, err] = await fn(validate(spec, data, opt))
  t.equal(result, null)
  t.equal(err.message, 'user not found')
})

// Test owner if user and no project
it('should fail with user and no project', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    project_id: {
      owner: 'user'
    }
  }

  var data = {
    project_id: '1234'
  }

  $.data.user = { id: '9999', name: 'Vidar' }

  var result = await validate(spec, data, opt)

  t.equal(result.project_id[0], 'validation.owner')
})

// Test owner if user and wrong project
it('should fail with user and wrong project', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    project_id: {
      owner: 'user'
    }
  }

  db('project').create({ id: '2222', name: 'hello' })

  var data = {
    project_id: '1234'
  }

  $.data.user = { id: '9999', name: 'Vidar' }

  var result = await validate(spec, data, opt)

  t.equal(result.project_id[0], 'validation.owner')
})

// Test owner if user and correct project
it('should validate with user and correct project', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    project_id: {
      owner: 'user'
    }
  }

  db('project').create({
    id: '2222',
    name: 'hello',
    user_id: '9999'
  })

  var data = {
    project_id: '2222'
  }

  $.data.user = { id: '9999', name: 'Vidar' }

  result = await validate(spec, data, opt)
  t.equal(result, null)
})
