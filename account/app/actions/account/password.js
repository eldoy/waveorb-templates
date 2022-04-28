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
    },
    values: {
      current: {
        required: true,
        min: 8,
        matcher: async function(current, $) {
          if (!$.tools.compare(current, $.account.password)) {
            return $.t('actions.account.password_not_valid')
          }
        }
      },
      password: {
        required: true,
        min: 8
      }
    }
  })

  const { query = {}, values = {} } = $.params
  const password = $.tools.hash(values.password)
  return await $.db('account').update(query, { password })
}