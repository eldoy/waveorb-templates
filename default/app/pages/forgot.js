module.exports = async function($) {
  $.page.title = $.t('pages.forgot.title')

  async function handleForgot(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('forgotPassword', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      showErrors(result)
    } else {
      cookie('flash', $.t('pages.forgot.confirmation'))
      location = $.link('login')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.forgot.header') }</h1>
    <form onsubmit="handleForgot(this);return false">
      <p>
        <label for="email">${ $.t('pages.forgot.email_label') }</label>
        <br>
        <input id="email" type="text" name="email" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.forgot.submit') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>
    <p>
      <a href="${ $.link('login') }">${ $.t('pages.forgot.back') }</a>
    </p>
    <script>${ handleForgot }</script>
  `
}