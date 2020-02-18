module.exports = async function($) {
  $.page.title = $.t('pages.terms.title')
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
    <h1>${ $.t('pages.terms.header') }</h1>
    <h2>${ $.t('pages.terms.section1') }</h2>
    <h3>${ $.t('pages.terms.introduction') }</h3>
    <p>${ $.t('pages.terms.paragraph1') }</p>
    <p>${ $.t('pages.terms.paragraph2') }</p>
    <p>${ $.t('pages.terms.paragraph3') }</p>
    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph4') }
    </p>

    <h2>${ $.t('pages.terms.section2') }</h2>
    <h3>${ $.t('pages.terms.account') }</h3>
    <p>${ $.t('pages.terms.paragraph5') }</p>
    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph6') }
    </p>

    <h2>${ $.t('pages.terms.section3') }</h2>
    <h3>${ $.t('pages.terms.conditions') }</h3>
    <p>${ $.t('pages.terms.paragraph7') }</p>
    <p>${ $.t('pages.terms.paragraph8') }</p>
    <p>${ $.t('pages.terms.paragraph9') }</p>
    <p>${ $.t('pages.terms.paragraph10') }</p>
    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph11') }
    </p>
    <p>${ $.t('pages.terms.paragraph12') }</p>

    <h2>${ $.t('pages.terms.section4') }</h2>
    <h3>${ $.t('pages.terms.fee') }</h3>
    </p>${ $.t('pages.terms.paragraph13') }</p>
    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph14') }
    </p>

    <h2>${ $.t('pages.terms.section5') }</h2>
    <h3>${ $.t('pages.terms.cancellation') }</h3>
    <p>${ $.t('pages.terms.paragraph15') }</p>
    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph16') }
    </p>

    <h2>${ $.t('pages.terms.section6') }</h2>
    <h3>${ $.t('pages.terms.modifications') }</h3>
    <p>${ $.t('pages.terms.paragraph17') }</p>

    <p class="basically">
      <span>${ $.t('pages.terms.basically') }</span>,
      ${ $.t('pages.terms.paragraph18') }
    </p>
  `
}
