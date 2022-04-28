module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  $.page.title = 'Delete todo'

  async function handleDelete(btn) {
    btn.disabled = true
    var result = await api('/todo/delete', { query: { id } })
    if (result.error) {
      flash(result.error.message)
    } else {
      cookie('flash', 'Todo deleted')
      location = '/todo/list'
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api('/todo/get', { query: { id } })
    html('form', /* html */`
      <p>
        Really delete <mark>&rdquo;${esc(item.task)}&rdquo;</mark>?
      </p>
      <p>
        <button onclick="handleDelete(this)">Delete</button>
        <a href="/todo/list">Cancel</a>
      </p>
    `)
  }

  return /* html */`
    <h1>Delete todo</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('todo_id')
      ${renderForm}
      renderForm()
      ${handleDelete}
    </script>
  `
}