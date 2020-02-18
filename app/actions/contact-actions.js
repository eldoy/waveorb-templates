/** Support routes */
module.exports = {
  sendContactMessage: {
    validate: {
      data: {
        email: {
          is: '$email'
        },
        subject: {
          minlength: 5
        },
        content: {
          minlength: 10
        }
      }
    },
    main: async function($) {
      const { email, subject, content } = $.params.data
      return await $.app.mailer('contact-mail', { subject, from: email }, $, { content })
    }
  }
}
