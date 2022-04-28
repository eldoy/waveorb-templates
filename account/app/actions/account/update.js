module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])

  await $.allow({
    query: ['id'],
    values: ['email', 'name']
  })

  await $.validate({
    query: {
      id: {
        required: true,
        is: 'id',
        exist: 'account',
        matcher: async function(id, $) {
          if (id != $.account.id) {
            return 'id does not match current login'
          }
        }
      }
    },
    values: {
      email: {
        is: 'email',
        matcher: async function(email, $) {
          if (email !== $.account.email) {
            const count = await $.db('account').count({ email })
            if (count) {
              return 'email is taken'
            }
          }
        }
      },
      name: {
        min: 2
      }
    }
  })

  const { query = {}, values = {} } = $.params
  return await $.db('account').update(query, values)
}