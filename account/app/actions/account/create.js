const crypto = require('crypto')

module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'guest-required'
  ])

  await $.allow({ values: ['email', 'name', 'password', 'confirm'] })

  await $.validate({
    values: {
      email: {
        required: true,
        is: 'email',
        matcher: async function(email, $) {
          if ($.app.config.invites.length && !$.app.config.invites.includes(email)) {
            return 'email is not on the invite list'
          }
        },
        unique: 'account'
      },
      name: {
        required: true,
        min: 2
      },
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

  const { values = {} } = $.params
  let { email, name, password } = values
  password = $.tools.hash(password)
  const md5 = $.tools.md5(email)
  const hash = $.tools.hash(email)
  const color = $.helpers.getColor()
  if (process.env.NODE_ENV != 'test') {
    $.mailer.send('signup-mail', $, {
      to: email,
      from: $.app.config.env.email
    })
  }
  return await $.db('account').create({
    name,
    email,
    password,
    md5,
    color
  })
}
