module.exports = async function($) {
  $.page.title = $.t('pages.contact.title')

  async function handleSubmit(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('sendContactMessage', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      showErrors(result)
    } else {
      form.reset()
      toggleStatus()
    }
  }

  function toggleStatus(on) {
    q('.thank-you').style.display = on ? 'none' : ''
    q('.support-form').style.display = on ? '' : 'none'
  }

  return /* html */`
    <h1>${ $.t('pages.contact.header') }</h1>

    <div class="thank-you" style="display: none">
      <h2>${ $.t('pages.contact.message') }</h2>
      <p>
      ${ $.t('pages.contact.sub_message') }
      </p>
      <div>
        <a href="javascript:void(0)" onclick="toggleStatus(this);return false">
        ${ $.t('pages.contact.new_message') }
        </a>
      </div>
    </div>

    <div class="support-form">
      <form class="support-form" onsubmit="handleSubmit(this);return false">
        <p>
          <label for="email">${ $.t('pages.contact.email_label') }</label>
          <br>
          <input id="email" name="email" type="email" oninput="clearFields(this)">
          <span class="errors email-errors"></span>
        </p>
        <p>
          <label for="subject">${ $.t('pages.contact.subject_label') }</label>
          <br>
          <input id="subject" name="subject" type="text" oninput="clearFields(this)">
          <span class="errors subject-errors"></span>
        </p>
        <p>
          <label for="content">${ $.t('pages.contact.message_label') }</label>
          <br>
          <textarea id="content" name="content" oninput="clearFields(this)"></textarea>
          <span class="errors content-errors"></span>
        </p>
        <p>
          <button>
            <span>${ $.t('pages.contact.send') }</span>
            <img src="/img/spinner.svg">
          </button>
        </p>
      </form>
    </div>
    <script>${ handleSubmit }${ toggleStatus }</script>
  `
}
