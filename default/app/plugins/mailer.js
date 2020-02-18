const mailer = require('wmail')

module.exports = async function(app) {
  const { mailgun, options } = app.config.mail
  app.mailer = mailer({ app, ...mailgun, options })
}
