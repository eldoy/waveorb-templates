module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])

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

  const {
    query = {},
    fields = {},
    sort = {},
    skip = 0,
    limit = 0
  } = $.params

  return await $.db('account').find(query, {
    fields,
    sort,
    skip,
    limit
  })
}
