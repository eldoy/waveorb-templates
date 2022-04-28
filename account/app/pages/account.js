module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  $.page.title = $.t('account.title')
  $.page.layout = 'dialog'

  function handleToggleSection(el) {
    el.parentNode.classList.toggle('hidden')
  }

  async function handleUpload(input) {
    var result = await api('/account/upload',
      {
        query: {
          id: account.id
        }
      },
      {
        files: input.files,
        progress: function (event) {
          var { loaded, total, percent } = event
          text('.progress', `${(loaded/1024).toFixed(2)} kB/${(total/1024).toFixed(2)} kB, ${percent}%`)
        }
      }
    )
    if (result.image) {
      account.image = result.image
      var image =
      html('.account-image', avatar(account, { size: 'medium' }))
      html('#menu .blokk-avatar', avatar(account))
    }
  }

  async function handleSaveAccount(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api('/account/update', {
      query: { id: account.id },
      values
    })
    if (result.error) {
      showErrors(result, { scroll: false })
    } else {
      cookie('flash', 'Account saved')
      goBack()
    }
    button.disabled = false
  }

  async function handleUpdatePassword(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api('/account/password', {
      query: { id: account.id },
      values
    })
    if (result.error) {
      showErrors(result, { scroll: false })
    } else {
      q('#current').value = ''
      q('#password').value = ''
      cookie('flash', 'Account saved')
      goBack()
    }
    button.disabled = false
  }

  async function handleDeleteAccount(button) {
    if (confirm('Are you sure?')) {
      button.disabled = true
      var result = await api('/account/delete', {
        query: { id: account.id }
      })
      if (result.error) {
        flash(result.error.message, { scroll: false })
      } else {
        cookie('flash', t['account.confirmation'])
        cookie('login', null)
        location = '/login'
      }
      button.disabled = false
    }
  }

  async function renderAccount() {
    html('#settings', /* html */`
      <section class="account-section hidden">
        <h4 onclick="handleToggleSection(this)">
          <span class="text">Profile Image</span>
          <span class="chevron"></span>
        </h4>
        <div class="account-switch">
          <div class="account-image">${avatar(account, { size: 'medium' })}</div>
          <label for="upload">Image</label>
          <input id="upload" type="file" onchange="handleUpload(this)">
        </div>
      </section>

      <section class="account-section hidden">
        <h4 onclick="handleToggleSection(this)">
          <span class="text">Name &amp; Email</span>
          <span class="chevron"></span>
        </h4>
        <div class="account-switch">
          <form onsubmit="return false">
            <p>
              <label for="name">Name</label>
              <span class="star" title="required">*</span>
              <br>
              <input id="name" name="name" type="text" value="${esc(account.name)}" oninput="clearErrors(this)" data-default="">
              <em class="name-errors"></em>
            </p>
            <p>
              <label for="email">Email</label>
              <span class="star" title="required">*</span>
              <br>
              <input id="email" type="email" name="email" value="${esc(account.email)}" oninput="clearErrors(this)" data-default="">
              <em class="email-errors"></em>
            </p>
            <p>
              <button onclick="handleSaveAccount(this)">Save</button>
            </p>
          </form>
        </div>
      </section>

      <section class="account-section hidden">
        <h4 onclick="handleToggleSection(this)">
          <span class="text">Change Password</span>
          <span class="chevron"></span>
        </h4>
        <div class="account-switch">
          <form onsubmit="return false">
            <p>
              <label for="current">Current password</label>
              <span class="star" title="required">*</span>
              <br>
              <input id="current" type="password" name="current" oninput="clearErrors(this)">
              <em class="current-errors"></em>
            </p>
            <p>
              <label for="password">New password</label>
              <span class="star" title="required">*</span>
              <br>
              <input id="password" type="password" name="password" oninput="clearErrors(this)">
              <em class="password-errors"></em>
            </p>
            <p>
              <button onclick="handleUpdatePassword(this)">Save</button>
            </p>
          </form>
        </div>
      </section>

      <section class="account-section hidden">
        <h4 onclick="handleToggleSection(this)">
          <span class="text">Delete Account</span>
          <span class="chevron"></span>
        </h4>
        <div class="account-switch">
          <form onsubmit="return false">
            <p>
              <label class="warning-label">This cannot be undone</label>
            </p>
            <p>
              <button onclick="handleDeleteAccount(this)">Delete Account</button>
            </p>
          </form>
        </div>
      </section>
    `
    )
  }

  return /* html */ `
    <div id="settings"></div>
    <div style="text-align:center"><a href="javascript:void(0)" onclick="goBack()">Cancel</a></div>
    <script>
      var account = ${JSON.stringify($.account)}
      ${handleUpload}
      ${handleSaveAccount}
      ${handleUpdatePassword}
      ${handleDeleteAccount}
      ${renderAccount}
      ${handleToggleSection}
      renderAccount()
      var t = {
        'account.confirmation': '${$.t('account.confirmation')}'
      }
    </script>
  `
}
