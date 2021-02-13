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
      Waveorb is everything you need to develop fast, future proof, advanced applications.
    </p>
    <p>
      <a href="https://waveorb.com/about.html">
        Read more about Waveorb here.
      </a>
    </p>
  `
}
