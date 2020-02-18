module.exports = async function($) {
  $.page.title = $.t('pages.about.title')

  return /* html */`
    <h1>${ $.t('pages.about.header') }</h1>
    <p>${ $.t('pages.about.intro') }</p>
    <p>
      ${ $.t('pages.about.read_more') }
      <a href="https://waveorb.com/about.html">${ $.t('pages.about.link_text') }</a>
    </p>
  `
}
