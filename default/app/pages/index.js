module.exports = async function($) {
  $.page.title = $.t('pages.index.title')
  return /* html */`
    <script>document.body.classList.add('home')</script>
    <style>
      .intro,
      .action,
      .why {
        padding: 4rem 0;
        text-align: center;
      }
      img.waveorb-logo {
        width: 341px;
        height: 174px;
      }
      .why {
        background-color: rgb(17, 126, 126);
        color: white;
      }
      .action {
        padding-bottom: 3rem;
      }
      .signature {
        padding: 2rem 0;
        color: white;
        font-size: 80%;
        text-align: center;
        background-color: #49445d;
      }
      .signature a {
        color: white;
      }
      a.cta {
        margin-top: 0.8rem;
        display: inline-block;
        width: 90%;
        max-width: 200px;
        padding: 15px 5px;
        background-color: rgb(17, 126, 126);
        color: white;
        text-decoration: none;
      }
      a.cta:hover,
      a.cta:active {
        background-color: rgb(22, 153, 150);
      }
    </style>
    <div class="intro">
      <img class="waveorb-logo" src="/img/waveorb-logo-full.svg" alt="waveorb-logo">
      <h1>${ $.t('pages.index.header') }</h1>
      <p>${ $.t('pages.index.intro') }</p>
    </div>
    <div class="why">
      <h1>${ $.t('pages.index.header1') }</h1>
      <h3>${ $.t('pages.index.sub_header1') }</h3>
      <p>${ $.t('pages.index.text1') }</p>
      <h3>${ $.t('pages.index.sub_header2') }</h3>
      <p>${ $.t('pages.index.text2') }</p>
      <h3>${ $.t('pages.index.sub_header3') }</h3>
      <p>${ $.t('pages.index.text3') }</p>
      <h3>${ $.t('pages.index.sub_header4') }</h3>
      <p>${ $.t('pages.index.text4') }</p>
    </div>

    <div class="action">
      <h2>${ $.t('pages.index.header2') }</h2>
      <p>${ $.t('pages.index.text5') }</p>
      <div>
        <a class="cta" href="${ $.link('sites') }">${ $.t('pages.index.signup') }</a>
      </div>
    </div>
    <div class="signature">
      Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
    </div>
  `
}
