module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  $.page.title = 'New todo'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api('/todo/create', { values })
    if (!showErrors(result)) {
      cookie('flash', 'Todo created')
      location = '/todo/list'
    }
    btn.disabled = false
  }

  async function renderForm() {
    html('form', /* html */`
      <p>
        <label for="task">Task</label>
        <input id="task" type="text" name="task" oninput="clearErrors(this)">
        <em class="task-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="/todo/list">Cancel</a>
      </p>
    `)
  }

  return /* html */`
    <h1>New todo</h1>
    <form onsubmit="return false"></form>
    <script>
      ${renderForm}
      renderForm()
      ${handleSave}
    </script>
  `
}