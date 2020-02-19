module.exports = async function($) {
  $.page.title = $.t('pages.privacy.title')

  return /* html */`
    <style>
      .basically {
        background-color: #f5f5f5;
        padding: 0.3rem 0.2rem;
      }
      .basically span {
        font-weight: bold;
      }
    </style>
    <h1>${ $.t('pages.privacy.header') }</h1>
    <h2>${ $.t('pages.privacy.section1') }</h2>
    <h3>${ $.t('pages.privacy.general') }</h3>
    <p>${ $.t('pages.privacy.paragraph1') }</p>
    <p>${ $.t('pages.privacy.paragraph2') }</p>
    <p>${ $.t('pages.privacy.paragraph3') }</p>

    <h2>${ $.t('pages.privacy.section2') }</h2>
    <h3>${ $.t('pages.privacy.info') }</h3>
    <p>${ $.t('pages.privacy.paragraph4') }</p>
    <p>${ $.t('pages.privacy.paragraph5') }</p>
    <p>${ $.t('pages.privacy.paragraph6') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph7') }
    </p>

    <h2>${ $.t('pages.privacy.section3') }</h2>
    <h3>${ $.t('pages.privacy.security') }</h3>
    <p>${ $.t('pages.privacy.paragraph8') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph9') }
    </p>

    <h2>${ $.t('pages.privacy.section4') }</h2>
    <h3>${ $.t('pages.privacy.disclosure') }</h3>
    <p>${ $.t('pages.privacy.paragraph10') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph11') }
    </p>

    <h2>${ $.t('pages.privacy.section5') }</h2>
    <h3>${ $.t('pages.privacy.storage') }</h3>
    <p>${ $.t('pages.privacy.paragraph12') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph13') }
    </p>

    <h2>${ $.t('pages.privacy.section6') }</h2>
    <h3>${ $.t('pages.privacy.cookies') }</h3>
    <p>${ $.t('pages.privacy.paragraph14') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph15') }
    </p>

    <h2>${ $.t('pages.privacy.section7') }</h2>
    <h3>${ $.t('pages.privacy.privacy') }</h3>
    <p>${ $.t('pages.privacy.paragraph16') }</p>

    <p class="basically">
      <span>${ $.t('pages.privacy.basically') }</span>
      ${ $.t('pages.privacy.paragraph17') }
    </p>
  `
}
