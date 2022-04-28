module.exports = async function ($) {
  await $.setups(['account'])

  $.page.title = $.t('reset.title')
  $.page.layout = 'dialog'
  $.page.login = false

  return /* html */`
    <p id="loader">Please wait, verifying key...</p>
    <form onsubmit="return false" style="display:none">
      <p>
        <label for="password">${$.t('reset.password')}</label>
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
        <button onclick="handleUpdate(this)">Save</button>
      </p>
    </form>
    <script>
      var key = params('key')
      ${handleUpdate}
      ${handleVerify}
      handleVerify()
    </script>
  `

  async function handleVerify() {
    if (!key) {
      cookie('flash', 'Reset key is missing')
      location = '/forgot'
    } else {
      var reset = await api('/reset/get', { query: { key } })
      if (reset.error) {
        cookie('flash', 'Reset key is not valid')
        location = '/forgot'
      } else {
        q('#loader').style.display = 'none'
        q('form').style.display = 'block'
      }
    }
  }

  async function handleUpdate(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api('/reset/update', {
      query: { key },
      values
    })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('flash', 'Password updated')
      cookie('login', result.token)
      location = '/profile'
    }
    btn.disabled = false
  }
}
