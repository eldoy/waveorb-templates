module.exports = async function($) {

  // Authenticate by api key
  const apikey = $.params.apikey
  if (apikey && apikey == $.app.config.env.apikey) {
    // Find site
    if ($.params.site) {
      $.site = await $.db('site').get({
        email: $.params.site
      })
    }
    if (!$.site) {
      return { error: { message: 'site not found' } }
    }
    $.account = await $.db('account').get({ id: $.site.account_id })
  }

  // Authenticate by token
  const token = $.params.auth || $.req.headers['authorization'] || $.req.cookie('login')
  if (token && !$.account) {
    const login = await $.db('login').get({ token })
    if (login && login.account_id) {
      $.account = await $.db('account').get({ id: login.account_id })
      if (!$.account) {
        $.req.cookie('token', null)
        await $.db('login').delete({ token })
        delete $.account
      }
    }
  }
}
