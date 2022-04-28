module.exports = async function($) {
  if ($.account) {
    return { error: { message: $.t('filters.authenticate.already_logged_in') } }
  }
}
