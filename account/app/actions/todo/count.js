module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])
  const { query = {} } = $.params
  const count = await $.db('todo').count(query)
  return { n: count }
}