module.exports = async function($) {
  if (!$.account) {
    return $.req.redirect('/')
  }
}
