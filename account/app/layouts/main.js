module.exports = async function($) {
  return /* html */`
    <!doctype html>
    <html lang="${$.lang}">
      ${$.app.views.layout.head($)}
      <body>
        <header id="header">
          <nav>
            <div>
              <a href="${$.link('index')}">
                <!-- <img src="/img/7i-logo.svg" height="30" width="30" style="height:30px;vertical-align:middle;margin-right:0.5rem"> -->
                Home
              </a>
              <a href="${$.link('about')}">About</a>
              <a href="${$.link('support')}">Support</a>
            </div>
            <div>${$.app.views.menu($)}</div>
          </nav>
        </header>
        <script>
          toggleVisibility()
          setActiveLink()
        </script>
        <div class="notify"><div class="flash" id="flash"></div></div>
        <main>${$.page.content}</main>
        <footer>
          Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
        </footer>
        <script>flash()</script>
      </body>
    </html>
  `
}
