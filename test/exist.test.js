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
    opt = { ext: validations($), lax: true, $ }
  })

  // Test exist
  it('should fail if not exist', async () => {

    let spec = {
      id: {
        exist: 'project'
      }
    }

    let data = {
      id: '1234'
    }

    let result = await validate(spec, data, opt)
    expect(result.id[0]).toBe('validation.exist')

    const project = db('project').create({ name: 'hello' })

    data.id = project.id

    result = await validate(spec, data, opt)
    expect(result).toBeNull()
  })
})
