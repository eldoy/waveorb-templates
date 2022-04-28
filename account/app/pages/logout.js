module.exports = async function($) {
  $.page.title = 'Logging out...'
  $.page.layout = 'redirect'

  async function handleLogout() {
    var token = cookie('login')
    if (token) {
      var result = await api('/login/delete', { query: { token } })
      if (result.error) {
        return flash(result.error.message)
      }
      cookie('login', null)
      cookie('flash', 'You have been logged out.')
      location = '/'
    }
  }

  return /* html */`
    <script>
      ${handleLogout}
      handleLogout()
    </script>
  `
}
