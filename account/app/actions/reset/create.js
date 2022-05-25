module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'guest-required'
  ])

  await $.allow({
    values: ['email']
  })

  await $.validate({
    values: {
      email: {
        required: true,
        is: 'email'
      }
    }
  })

  const { values = {} } = $.params
  const { email } = values
  const account = await $.db('account').get({ email })
  if (!account) {
    return { error: { message: $.t('actions.login.forgot_password.account_not_found') } }
  }
  const key = $.tools.uuid()
  const expires_at = new Date().getTime() + 15 * 6e4

  if (process.env.NODE_ENV != 'test') {
    $.mailer.send('reset-mail', $,
      { to: email, from: $.app.config.env.email },
      { key }
    )
  }
  return await $.db('reset').create({
    key,
    account_id: account.id,
    expires_at
  })
}