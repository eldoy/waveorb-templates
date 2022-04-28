module.exports = async function($) {

  const token = $.req.cookie('login')
  if (!token) {
    return
  }

  const login = await $.db('login').get({ token })
  if (!login) {
    return
  }

  const account = await $.db('account').get({ id: login.account_id })
  if (!account) {
    return
  }

  $.account = account
}