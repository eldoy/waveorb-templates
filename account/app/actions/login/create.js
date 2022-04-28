module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'guest-required'
  ])

  await $.allow({
    values: ['email', 'password']
  })

  await $.validate({
    values: {
      email: {
        required: true,
        is: 'email'
      },
      password: {
        required: true,
        min: 8
      }
    }
  })

  const { values = {} } = $.params
  const { email = '', password = '' } =  values

  const account = await $.db('account').get({ email })
  if (!account) {
    return {
      error: {
        message: $.t('actions.login.account_not_found')
      }
    }
  }
  if (process.env.NODE_ENV != 'test') {
    if (!$.tools.compare(password, account.password)) {
      return {
        error: {
          message: $.t('actions.login.password_not_valid')
        }
      }
    }
  }
  const token = $.tools.uuid()
  await $.db('login').create({ account_id: account.id, token })
  return { token }
}