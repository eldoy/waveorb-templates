module.exports = async function($) {
  $.page.title = 'Create incredible web apps'

  return /* html */`
    <style>
      img.waveorb-logo {
        max-height: 174px;
      }
    </style>
    <div>
      <img class="waveorb-logo" src="/img/waveorb-logo-full.svg" alt="waveorb-logo">
      <h1>Create incredible web apps</h1>
      <p>The complete framework for building fast applications.</p>
    </div>
  `
}
