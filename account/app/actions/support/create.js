
module.exports = async function($) {
  await $.validate({
    values: {
      email: {
        is: '$email',
        required: true
      },
      subject: {
        minlength: 3,
        required: true
      },
      content: {
        minlength: 3,
        required: true
      }
    }
  })
  const { values = {} } = $.params
  const { email, subject, content } = values
  if (process.env.NODE_ENV != 'test') {
    $.mailer.send('support-mail', $, {
      subject,
      to: email,
      from: $.app.config.env.email
    },
    { content })
  }
  return await $.db('support').create(values)
}
