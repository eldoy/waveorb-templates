module.exports = async function($) {
  $.page.title = $.t('pages.login.title')

  async function handleLogin(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('createSession', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      showErrors(result)
    } else {
      cookie('token', result.token)
      cookie('flash', $.t('pages.login.welcome'))
      location = $.link('sites')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.login.header') }</h1>
    <form class="login-form" onsubmit="handleLogin(this);return false">
      <p>
        <label for="email">${ $.t('pages.login.form.email') }</label>
        <br>
        <input id="email" name="email" type="email" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <label for="password">${ $.t('pages.login.form.password') }</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.login.form.button') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>
    <p>
      ${ $.t('pages.login.noaccount') }
      <a href="${ $.link('signup') }">${ $.t('pages.login.signup') }</a>
    </p>
    <p>
      <a href="${ $.link('forgot') }">${ $.t('pages.login.forgot') }</a>
    </p>
    <script>${ handleLogin }</script>
  `
}
