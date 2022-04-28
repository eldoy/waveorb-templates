module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])
  return $.account
}