module.exports = async function ($) {
  await $.setups(['account'])

  $.page.title = 'Support'

  async function handleSubmit(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api('/support/create', { values })

    if (result.error) {
      showErrors(result)
    } else {
      cookie('flash', 'Message sent!')
      location = '/'
    }
    button.disabled = false
  }

  return /* html */ `
    <h1>Support</h1>
    <p>
      Send us a message if there's anything you're wondering about
    </p>
    <form class="support-form" onsubmit="return false">
      <p>
        <label for="email">Your email</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="email" name="email" type="text" oninput="clearErrors(this)">
        <em class="email-errors"></em>
      </p>
      <p>
        <label for="subject">Subject</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="subject" name="subject" type="text" oninput="clearErrors(this)">
        <em class="subject-errors"></em>
      </p>
      <p>
        <label for="content">Message</label>
        <span class="star" title="required">*</span>
        <br>
        <textarea id="content" name="content" oninput="clearErrors(this)"></textarea>
        <em class="content-errors"></em>
      </p>
      <p>
        <button onclick="handleSubmit(this)">Send</button>
      </p>
    </form>
    <script>${handleSubmit}</script>
  `
}
