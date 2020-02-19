module.exports = async function($) {
  $.page.title = $.t('pages.reset.title')

  async function handleReset() {
    var key = params('key')
    if (!key) {
      cookie('flash', $.t('pages.reset.error_msg'))
      location = $.link('forgot')
    } else {
      var result = await api.action('resetPassword', { data: { key } })
      if (result.error) {
        cookie('flash', result.error.message)
        location = $.link('forgot')
      } else {
        cookie('token', result.token)
        init()
        q('.verify-key').style.display = 'none'
        q('.reset-form').style.display = ''
      }
    }
  }

  async function handleUpdate(form) {
    var password = serialize(form).password
    var result = await api.action('updatePassword', { data: { key, password } })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('flash', $.t('pages.reset.confirmation'))
      location = $.link('sites')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.reset.header') }</h1>
    <p class="verify-key">${ $.t('pages.reset.verify') }</p>
    <form onsubmit="handleUpdate(this);return false" style="display: none">
      <p>
        <label for="password">${ $.t('pages.reset.password_label') }</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.reset.update') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>
    <script>var key;(${ handleReset }());${ handleUpdate }</script>
  `
}
