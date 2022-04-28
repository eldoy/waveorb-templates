module.exports = async function($) {
  await $.setups(['account', 'login-required'])

  $.page.title = 'Todos'

  async function renderList() {
    var items = await api('/todo/find')
    if (items.length) {
      html('#list', /* html */`
        ${items.map(item => {
          return /* html */`
            <div class="flex list">
              <span>${esc(item.task)}</span>
              <nav>
                <a href="${`/todo/show?todo_id=${item.id}`}">
                  Show
                </a>
                <a href="${`/todo/edit?todo_id=${item.id}`}">
                  Edit
                </a>
                <a href="${`/todo/delete?todo_id=${item.id}`}">
                  Delete
                </a>
              </nav>
            </div>
          `
        }).join('')}
      `)
    } else {
      html('#list', `No todos found... Click on <mark>&ldquo;New todo&rdquo;</mark> to create one!`)
    }
  }

  return /* html */`
    <div class="flex">
      <h1>Todos</h1>
      <a id="new" href="${$.link('todo/new')}">New todo</a>
    </div>
    <div id="list"></div>
    <script>
      ${renderList}
      renderList()
    </script>
  `
}