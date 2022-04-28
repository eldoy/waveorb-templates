module.exports = async function ($) {
  await $.setups(['account'])

  $.page.title = $.t('login.title')
  $.page.layout = 'dialog'
  $.page.login = false

  async function handleLogin(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api('/login/create', { values })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('login', result.token)
      location = '/profile'
    }
    button.disabled = false
  }

  return /* html */ `
    <div id="page-login">
      <form class="login-form" onsubmit="return false">
        <p>
          <label for="email">${$.t('login.form.email')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="email" name="email" type="email" oninput="clearErrors(this)">
          <em class="email-errors"></em>
        </p>
        <p>
          <label for="password">${$.t('login.form.password')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="password" name="password" type="password" oninput="clearErrors(this)">
          <em class="password-errors"></em>
        </p>
        <p>
          <button onclick="handleLogin(this)">
            ${$.t('login.form.button')}
          </button>
          <a href="/forgot">${$.t('login.forgot')}</a>
        </p>
      </form>
      <p>
        ${$.t('login.no_account')}
        <a href="/signup">${$.t('login.signup')}</a>
      </p>
    </div>
    <script>
      ${handleLogin}
    </script>
  `
}
