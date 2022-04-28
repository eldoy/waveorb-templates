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
        exits: 'account',
        matcher: async function(id, $) {
          if (id != $.account.id) {
            return 'id does not match current login'
          }
        }
      }
    }
  })

  const { query = {} } = $.params
  const n = await $.db('account').count(query)
  return { n }
}
