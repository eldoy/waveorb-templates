module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])
  await $.validate({
    query: {
      id: {
        is: '$id',
        required: true
      }
    },
    values: {
      task: {
        minlength: 2
      }
    }
  })
  const { query = {}, values = {} } = $.params
  return await $.db('todo').update(query, values)
}