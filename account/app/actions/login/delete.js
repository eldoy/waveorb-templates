module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])

  await $.allow({
    query: ['token']
  })

  await $.validate({
    query: {
      token: {
        min: 36,
        required: true
      }
    }
  })

  const { query = {} } = $.params
  const { token } = query

  return await $.db('login').delete({ token })
}
