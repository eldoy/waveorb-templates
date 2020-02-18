module.exports = async function($) {
  $.page.title = $.t('pages.settings.title')

  async function fetchUser() {
    user = await api.action('fetchUser')
    if (user) {
      q('#email').value = user.email
    }
  }

  async function handleSaveEmail(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('updateUserEmail', { data: serialize(form) })
    button.disabled = false
    if (result.error) {
      showErrors(result)
    } else {
      flash($.t('pages.settings.email_updated'))
    }
  }

  async function handleSavePassword(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('updateUserPassword', { data: serialize(form) })
    button.disabled = false
    if (result.error) {
      showErrors(result)
    } else {
      form.reset()
      flash($.t('pages.settings.pw_updated'))
    }
  }

  async function handleDeleteAccount(form) {
    if (confirm($.t('pages.settings.confirm'))) {
      var button = formButton(form)
      qa('.errors', function(el) { text(el, '') })
      var result = await api.action('deleteUser')
      if (result.error) {
        button.disabled = false
        flash(result.error.message)
      } else {
        cookie('flash', $.t('pages.settings.confirmation'))
        cookie('token', '', -1)
        location = $.link('index')
      }
    }
  }

  return /* html */`
    <style>
      form {
        margin-bottom: 2.5rem;
      }
      .warning-label {
        position: relative;
        bottom: 1rem;
      }
    </style>

    <h1>${ $.t('pages.settings.header') }</h1>
    <h4>${ $.t('pages.settings.update') }</h4>
    <form onsubmit="handleSaveEmail(this);return false">
      <p>
        <label for="email">${ $.t('pages.settings.email_label') }</label>
        <br>
        <input id="email" type="email" name="email" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.settings.save') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>

    <h4>${ $.t('pages.settings.header_update') }</h4>
    <form onsubmit="handleSavePassword(this);return false">
      <p>
        <label for="current">${ $.t('pages.settings.cp_label') }</label>
        <br>
        <input id="current" type="password" name="current" oninput="clearFields(this)">
        <span class="errors current-errors"></span>
      </p>
      <p>
        <label for="password">${ $.t('pages.settings.np_label') }</label>
        <br>
        <input id="password" type="password" name="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.settings.save') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>

    <h4 style="color: red">${ $.t('pages.settings.delete_account') }</h4>
    <form onsubmit="handleDeleteAccount(this);return false">
      <p>
        <label class="warning-label">${ $.t('pages.settings.warning') }</label>
      </p>
      <button>
        <span>${ $.t('pages.settings.delete_account') }</span>
        <img src="/img/spinner.svg">
      </button>
    </form>
    <script>
      ${ handleSaveEmail };
      ${ handleSavePassword };
      ${ handleDeleteAccount };
      ${ fetchUser };
      var user; fetchUser()
    </script>
  `
}
