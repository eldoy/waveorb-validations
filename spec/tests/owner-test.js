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

// We need the model (project) and the target (user, account)
// Only works if we're logged in
// {
//   values: {
//     project_id: {
//       owner: 'user'
//   }
// }

// Se then we get the target (user) and we check if the

// var user = await db('user').get({ token })
// var user = $.data[owner.target] || $.cache[owner.target]

// var project = await db('project').get({ id: project_id })
// if (project && project.user_id == user.id) {
//   ok
// } else {
//   fail
// }

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

// Test owner if user and wrong project
o(
  'should fail with user and wrong project',
  async function ({ t, db, validate }) {
    var spec = {
      project_id: {
        owner: 'user'
      }
    }

    var data = {
      project_id: '1234'
    }

    var result = await validate(spec, data, opt)
    t.equal(result.id[0], 'validation.owner')

    var project = db('project').create({ name: 'hello' })

    data.id = project.id

    result = await validate(spec, data, opt)
    t.equal(result, null)
  }
)

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

  var data = {
    project_id: '1234'
  }

  var result = await validate(spec, data, opt)
  t.equal(result.id[0], 'validation.owner')

  var project = db('project').create({ name: 'hello' })

  data.id = project.id

  result = await validate(spec, data, opt)
  t.equal(result, null)
})
