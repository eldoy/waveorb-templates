module.exports = async function($) {
  $.page.title = 'About'

  return /* html */`
    <style>
      main {
        text-align: center;
      }
    </style>
    <h1>About</h1>
    <p>
      Waveorb is everything you need to develop fast and future proof applications.
    </p>
    <p>
      <a href="https://waveorb.com/about">
        Read more about Waveorb here
      </a>
    </p>
  `
}
