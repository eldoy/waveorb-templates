module.exports = async function($, data) {

  const link = `${$.app.config.env.admin}/reset?key=${data.key}`

  return {
    subject: 'Reset Password',
    content: /* html */ `
      <h1>Reset Password</h1>
      <p>
        Follow this link to reset your password:
      </p>
      <p>
        <a href="${link}">${link}</a>
      </p>
      <p>Stay strong.</p>
    `
  }
}
