const wmailer = require('waveorb-mailer')

module.exports = function(app) {
  return wmailer(app.config.mail)
}
