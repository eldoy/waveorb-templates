module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])
  await $.validate({
    values: {
      task: {
        required: true,
        minlength: 2
      }
    }
  })
  const { values = {} } = $.params
  return await $.db('todo').create(values)
}