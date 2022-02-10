const { validate } = require('d8a')
const db = require('configdb')
const validations = require('../index.js')

let $, opt

describe('unique', () => {

  beforeEach(() => {
    db('user').clear()
    $ = {
      db,
      t: function(key) { return key },
      params: { query: {}, values: {} }
    }
    opt = { ...$, ext: validations($), lax: true }
  })

  // Test unique on create
  it('should validate unique user on create', async () => {
    let spec = {
      email: {
        unique: 'user'
      }
    }

    let data = {
      email: 'test@example.com'
    }

    let result = await validate(spec, data, opt)
    expect(result).toBeNull()

    db('user').create({ email: 'test@example.com' })

    result = await validate(spec, data, opt)

    expect(result.email[0]).toBe('validation.unique')
  })

  // Test unique on update
  it('should validate unique user on update', async () => {

    const user = db('user').create({ email: 'test@example.com' })

    opt.params.query = { id: user.id }

    let spec = {
      email: {
        unique: 'user'
      }
    }

    let data = {
      email: 'other@example.com'
    }

    let result = await validate(spec, data, opt)
    expect(result).toBeNull()

    // Random other id
    opt.params.query = { id: 'ckzh6cyj60000halpc89o2kr1' }

    data.email = 'test@example.com'

    result = await validate(spec, data, opt)

    expect(result.email[0]).toBe('validation.unique')
  })

  // Test unique on create, narrowed with ids
  it('should validate unique user on create, narrowed', async () => {

    let spec = {
      email: {
        unique: {
          in: 'user',
          with: ['site_id']
        }
      }
    }

    let data = {
      email: 'test@example.com'
    }

    let result = await validate(spec, data, opt)
    expect(result).toBeNull()

    db('user').create({ email: 'test@example.com', site_id: '1234' })

    result = await validate(spec, data, opt)

    expect(result.email[0]).toBe('validation.unique')

    opt.params.values.site_id = '1234'

    result = await validate(spec, data, opt)

    expect(result.email[0]).toBe('validation.unique')

    opt.params.values.site_id = '4321'

    result = await validate(spec, data, opt)

    expect(result).toBeNull()
  })

  // Test unique on update, narrowed with ids
  it('should validate unique user on update, narrowed', async () => {

    const user1 = db('user').create({
      email: 'test1@example.com',
      site_id: '1234'
    })
    const user2 = db('user').create({
      email: 'test2@example.com',
      site_id: '4321'
    })

    opt.params.query = { id: user1.id }

    let spec = {
      email: {
        unique: {
          in: 'user',
          with: ['site_id']
        }
      }
    }

    let data = {
      email: 'test1@example.com'
    }

    let result = await validate(spec, data, opt)
    expect(result).toBeNull()

    opt.params.values.email = 'new@example.com'

    result = await validate(spec, data, opt)
    expect(result).toBeNull()

    $.params.values.email = 'test2@example.com'

    result = await validate(spec, data, opt)
    expect(result).toBeNull()
  })

})
