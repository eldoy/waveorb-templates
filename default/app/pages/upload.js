module.exports = async function($) {
  $.page.title = $.t('pages.upload.title')

  async function handleUpload(form) {
    var button
    var urls = await api.upload('createUpload', {}, {
      progress: function(event) {
        if (!button) button = formButton(form)
        var { loaded, total, percent } = event
        text('.progress', `${ (loaded/1024).toFixed(2) } kb/${ (total/1024).toFixed(2) } kb, ${ percent }%`)
      }
    })
    if (button) button.disabled = false
    if (urls && urls.length) {
      html('.result', urls.map(url => `<img src="${ url }">`), 'end')
    }
  }

  return /* html */`
    <style>
      .progress {
        color: #555;
        font-size: 80%;
        text-transform: uppercase;
        text-shadow: 1px 1px #efefef;
        margin-left: 0.6rem;
      }
    </style>
    <h1>${ $.t('pages.upload.header') }</h1>
    <p>${ $.t('pages.upload.intro') }</p>
    <form onsubmit="handleUpload(this);return false">
      <button>
        <span>${ $.t('pages.upload.button') }</span>
        <img src="/img/spinner.svg">
      </button>
      <span class="progress"></span>
    </form>
    <div class="result"></div>
    <script>${ handleUpload }</script>
  `
}