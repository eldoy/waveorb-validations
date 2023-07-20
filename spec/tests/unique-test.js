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

// Test unique on create
it('should validate unique user on create', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    email: {
      unique: 'user'
    }
  }

  var data = {
    email: 'test@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  db('user').create({ email: 'test@example.com' })

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')
})

// Test unique on update
it('should validate unique user on update', async function ({
  t,
  db,
  validate
}) {
  var user = db('user').create({ email: 'test@example.com' })

  opt.$.params.query = { id: user.id }

  var spec = {
    email: {
      unique: 'user'
    }
  }

  var data = {
    email: 'other@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  // Random other id
  opt.$.params.query = { id: 'ckzh6cyj60000halpc89o2kr1' }

  data.email = 'test@example.com'

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')
})

// Test unique on create, narrowed with ids
it('should validate unique user on create, narrowed', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    email: {
      unique: {
        in: 'user',
        with: ['site_id']
      }
    }
  }

  var data = {
    email: 'test@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  db('user').create({ email: 'test@example.com', site_id: '1234' })

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')

  opt.$.params.values.site_id = '1234'

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')

  opt.$.params.values.site_id = '4321'

  result = await validate(spec, data, opt)

  t.equal(result, null)
})

// Test unique on update, narrowed with ids
it('should validate unique user on update, narrowed', async function ({
  t,
  db,
  validate
}) {
  var user1 = db('user').create({
    email: 'test1@example.com',
    site_id: '1234'
  })
  var user2 = db('user').create({
    email: 'test2@example.com',
    site_id: '4321'
  })

  opt.$.params.query = { id: user1.id }

  var spec = {
    email: {
      unique: {
        in: 'user',
        with: ['site_id']
      }
    }
  }

  var data = {
    email: 'test1@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  opt.$.params.values.email = 'new@example.com'

  result = await validate(spec, data, opt)
  t.equal(result, null)

  $.params.values.email = 'test2@example.com'

  result = await validate(spec, data, opt)
  t.equal(result, null)
})

// Test unique on create
it('should validate unique user on create', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    email: {
      unique: 'user'
    }
  }

  var data = {
    email: 'test@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  db('user').create({ email: 'test@example.com' })

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')
})

// Test unique on update
it('should validate unique user on update', async function ({
  t,
  db,
  validate
}) {
  var user = db('user').create({ email: 'test@example.com' })

  opt.$.params.query = { id: user.id }

  var spec = {
    email: {
      unique: 'user'
    }
  }

  var data = {
    email: 'other@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  // Random other id
  opt.$.params.query = { id: 'ckzh6cyj60000halpc89o2kr1' }

  data.email = 'test@example.com'

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')
})

// Test unique on create, narrowed with ids
it('should validate unique user on create, narrowed', async function ({
  t,
  db,
  validate
}) {
  var spec = {
    email: {
      unique: {
        in: 'user',
        with: ['site_id']
      }
    }
  }

  var data = {
    email: 'test@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  db('user').create({ email: 'test@example.com', site_id: '1234' })

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')

  opt.$.params.values.site_id = '1234'

  result = await validate(spec, data, opt)

  t.equal(result.email[0], 'validation.unique')

  opt.$.params.values.site_id = '4321'

  result = await validate(spec, data, opt)

  t.equal(result, null)
})

// Test unique on update, narrowed with ids
it('should validate unique user on update, narrowed', async function ({
  t,
  db,
  validate
}) {
  var user1 = db('user').create({
    email: 'test1@example.com',
    site_id: '1234'
  })
  var user2 = db('user').create({
    email: 'test2@example.com',
    site_id: '4321'
  })

  opt.$.params.query = { id: user1.id }

  var spec = {
    email: {
      unique: {
        in: 'user',
        with: ['site_id']
      }
    }
  }

  var data = {
    email: 'test1@example.com'
  }

  var result = await validate(spec, data, opt)
  t.equal(result, null)

  opt.$.params.values.email = 'new@example.com'

  result = await validate(spec, data, opt)
  t.equal(result, null)

  $.params.values.email = 'test2@example.com'

  result = await validate(spec, data, opt)
  t.equal(result, null)
})
