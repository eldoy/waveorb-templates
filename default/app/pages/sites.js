module.exports = async function($) {
  $.page.title = $.t('pages.sites.title')

  /**
   * Components
   */
  async function renderSiteList() {
    if (!sites) sites = await api.action('loadSiteList')
    if (sites.length) {
      html('.site-list', sites.map(function(s) { return siteListItem(s) }).join(''))
    } else {
      text('.site-list', $.t('pages.sites.nosites'))
    }
  }

  function siteListItem(s) {
    return /* html */`
      <div class="sitelist-item" id="site-${ s._id }">
        ${ siteListItemNormal(s) }
        ${ siteListItemEdit(s) }
      </div>
    `
  }

  function siteListItemNormal(s) {
    return /* html */`
      <div class="show-site">
        <div class="site-name">${ s.name }</div>
        <div>
          <button onclick="handleEditToggle('${ s._id }')">
            ${ $.t('pages.sites.edit_button') }
          </button>
          <button onclick="handleDeleteSite('${ s._id }')">
            ${ $.t('pages.sites.delete_button') }
          </button>
          ${ s.key ? `` : `<button onclick="handleActivate('${ s._id }')">${ $.t('pages.sites.activate_button') }</button>` }
          <div class="site-key">
            <span class="key-title">${ $.t('pages.sites.key') }</span>
            ${ s.key || $.t('pages.sites.not_activated')}
          </div>
        </div>
      </div>
    `
  }

  function siteListItemEdit(s) {
    return /* html */`
      <div class="edit-site" style="display: none; padding-bottom: 1.4rem;">
        <input type="text" name="edit" value="${ s.name }" oninput="clearFields(this)">
        <br>
        <button onclick="handleUpdateSite('${ s._id }')">${ $.t('pages.sites.save_button') }</button>
        <button onclick="handleEditToggle('${ s._id }', true)">${ $.t('pages.sites.cancel_button') }</button>
        <span class="errors edit-errors"></span>
      </div>
    `
  }

  /**
   * Handlers
   */
  async function handleCreate(form) {
    var button = formButton(form)
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('createSite', { data: serialize(form) })
    button.disabled = false
    if (result.error) {
      showErrors(result)
    } else {
      flash($.t('pages.sites.success'))
      form.reset()
      sites.unshift(result)
      renderSiteList()
    }
  }

  async function handleUpdateSite(_id) {
    var name = q('input[name=edit]').value.trim()
    var result = await api.action('updateSite', { data: { _id, name } })
    if (result.error) {
      text('.sitelist-item .errors', result.error.fields.name.join(', '))
    } else {
      handleEditToggle(_id, true)
      text('.site-name', name)
    }
  }

  async function handleDeleteSite(_id) {
    if (confirm($.t('pages.sites.confirm'))) {
      var result = await api.action('deleteSite', { data: { _id } })
      if (result.error) {
        text('.show-site .errors', result.error.message)
      } else {
        sites = sites.filter(function(s) { return s._id !== _id })
        renderSiteList()
      }
    }
  }

  function handleEditToggle(_id, active) {
    var el = q(`#site-${_id}`)
    q('.show-site', el).style.display = active ? '' : 'none'
    q('.edit-site', el).style.display = active ? 'none' : ''
  }

  function handleActivate(_id) {
    location = $.link(`activate?_id=${_id}`)
  }

  return /* html */`
    <style>
      .sitelist-item {
        margin: 1.5rem 0;
        padding: 0.6rem 0.8rem;
        line-height: 38px;
        border: 4px solid #f5f5f5;
        background-image: linear-gradient(#fff, #fcfcfc);
      }
      .site-name {
        font-size: 105%;
        font-weight: bold;
      }
      .site-key {
        font-size: 90%;
        color: #555;
      }
    </style>
    <h1>${ $.t('pages.sites.header') }</h1>
    <form onsubmit="handleCreate(this);return false">
      <p>
        <label for="name">${ $.t('pages.sites.name_label') }</label>
        <br>
        <input id="name" name="name" type="text" oninput="clearFields(this)">
        <span class="errors name-errors"></span>
      </p>
      <p>
        <button>
          <span>${ $.t('pages.sites.create') }</span>
          <img src="/img/spinner.svg">
        </button>
      </p>
    </form>
    <div class="site-list"></div>
    <script>
      var sites;
      ${renderSiteList};
      ${siteListItemEdit};
      ${siteListItemNormal};
      ${siteListItem};
      ${handleActivate};
      ${handleCreate};
      ${handleUpdateSite};
      ${handleDeleteSite};
      ${handleEditToggle};
      renderSiteList()
    </script>
  `
}
