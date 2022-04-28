module.exports = async function($) {
  if (!$.account) {
    return { error: { message: $.t('filters.authenticate.login_required') } }
  }
}