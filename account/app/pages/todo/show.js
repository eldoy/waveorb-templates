module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  $.page.title = 'Show todo'

  async function renderShow() {
    const item = await api('/todo/get', { query: { id } })
    html('#show', /* html */`
      <h1>Todo</h1>
      <dl>
        <dt>task</dt><dd>${esc(item.task)}</dd>
      </dl>
      <p>
        <a href="/todo/list">Back to list</a>
      </p>
    `)
  }

  return /* html */`
    <div id="show"></div>
    <script>
      var id = params('todo_id')
      ${renderShow}
      renderShow()
    </script>
  `
}