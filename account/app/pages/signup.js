module.exports = async function ($) {
  await $.setups(['account'])

  $.page.title = $.t('signup.title')
  $.page.layout = 'dialog'
  $.page.login = false

  async function handleLogin(values) {
    var { email, password } = values
    var result = await api('/login/create', {
      values: { email, password }
    })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    cookie('login', result.token)
    location = '/profile'
  }

  async function handleSignup(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api('/account/create', { values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    handleLogin(values)
  }

  return /* html */ `
    <form class="signup-form" onsubmit="return false">
      <p>
        <label for="name">${$.t('signup.form.name')}</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="name" name="name" type="text" oninput="clearErrors(this)">
        <em class="name-errors"></em>
      </p>
      <p>
        <label for="email">${$.t('signup.form.email')}</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="email" name="email" type="email" oninput="clearErrors(this)">
        <em class="email-errors"></em>
      </p>
      <p>
        <label for="password">${$.t('signup.form.password')}</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="password" name="password" type="password" oninput="clearErrors(this)">
        <em class="password-errors"></em>
      </p>
      <p>
        <label for="confirm">Confirm Password</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="confirm" name="confirm" type="password" oninput="clearErrors(this)">
        <em class="confirm-errors"></em>
      </p>
      <p>
        <button onclick="handleSignup(this)">${$.t('signup.form.button')}</button>
      </p>
    </form>
    <p>
      ${$.t('signup.account')}
      <a href="/login">${$.t('signup.login')}</a>
    </p>
    <script>
      ${handleSignup}
      ${handleLogin}
    </script>
  `
}
