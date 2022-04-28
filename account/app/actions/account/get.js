module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])

  await $.allow({ query: ['id'] })

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
    }
  })

  const { query = {} } = $.params
  return await $.db('account').get(query)
}
