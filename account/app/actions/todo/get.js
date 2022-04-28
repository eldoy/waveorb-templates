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
    }
  })
  const { query = {} } = $.params
  return await $.db('todo').get(query)
}