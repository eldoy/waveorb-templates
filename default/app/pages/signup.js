module.exports = async function($) {
  $.page.title = $.t('pages.signup.title')

  async function handleSignup(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('createUser', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      showErrors(result)
    } else {
      cookie('token', result.token)
      cookie('flash', $.t('pages.signup.confirmation'))
      location = $.link('sites')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.signup.header') }</h1>
    <form class="signup-form" onsubmit="handleSignup(this);return false">
      <p>
        <label for="email">${ $.t('pages.signup.form.email') }</label>
        <br>
        <input id="email" name="email" type="text" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <label for="password">${ $.t('pages.signup.form.password') }</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.signup.form.button') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>
    <p>
      ${ $.t('pages.signup.account') }
      <a href="${ $.link('login') }">${ $.t('pages.signup.login') }</a>
    </p>
    <script>${ handleSignup }</script>
  `
}
