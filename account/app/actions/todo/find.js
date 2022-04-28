module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])
  const {
    query = {},
    fields = {},
    sort = {},
    skip = 0,
    limit = 0
  } = $.params
  return await $.db('todo').find(query, { fields, sort, skip, limit })
}