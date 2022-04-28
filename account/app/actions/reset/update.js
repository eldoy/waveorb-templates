module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'guest-required'
  ])

  await $.allow({
    query: ['key'],
    values: ['password', 'confirm']
  })

  await $.validate({
    query: {
      key: {
        required: true,
        matcher: async function(key, $) {
          $.reset = await $.db('reset').get({ key })
          if (!$.reset) {
            return 'key is invalid'
          }
          if (new Date().getTime() > $.reset.time) {
            await $.db('reset').delete({ key })
            return 'key has expired'
          }
        }
      }
    },
    values: {
      password: {
        required: true,
        min: 8
      },
      confirm: {
        required: true,
        min: 8,
        matcher: async function(confirm, $) {
          if (confirm !== $.params.values?.password) {
            return 'does not match password'
          }
        }
      }
    }
  })

  const { query = {}, values = {} } = $.params
  const { account_id, key } = $.reset

  // Update account password
  const password = $.tools.hash(values.password)
  await $.db('account').update({ id: account_id }, { password })

  // Remove key
  await $.db('reset').delete({ key })

  // Login
  const token = $.tools.uuid()
  await $.db('login').create({ token, account_id })
  return { token }
}
